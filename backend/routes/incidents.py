from flask import Blueprint, jsonify, request
from services.truth_engine import evaluate_incident_reliability

incidents_bp = Blueprint('incidents', __name__)

# In-memory store (initialized with baseline synthetic incidents)
INCIDENTS_STORE = [
    {
        'id': 'INC-2026-081',
        'type': 'Flood',
        'title': 'Yamuna Floodplain Water Inundation',
        'location_name': 'East Delhi, Ring Road Sector',
        'coordinates': [28.6289, 77.2482],
        'severity': 'High',
        'status': 'Active',
        'reported_at': '12 mins ago',
        'affected_estimate': 340,
        'verification': evaluate_incident_reliability({
            'type': 'Flood',
            'satellite_detected': True,
            'has_photo': True,
            'image_score': 0.92,
            'nearby_reports_count': 6,
            'weather_trend_match': True,
            'minutes_ago': 12
        }),
        'description': 'Rapid water accumulation overflowing embankments. Service lanes submerged under 2.5 ft water.',
    },
    {
        'id': 'INC-2026-082',
        'type': 'Urban Fire',
        'title': 'Commercial Sector Substation Blaze',
        'location_name': 'MIDC Industrial Area, Mumbai',
        'coordinates': [19.1176, 72.8797],
        'severity': 'Critical',
        'status': 'Active',
        'reported_at': '24 mins ago',
        'affected_estimate': 120,
        'verification': evaluate_incident_reliability({
            'type': 'Urban Fire',
            'satellite_detected': True,
            'has_photo': True,
            'image_score': 0.98,
            'nearby_reports_count': 12,
            'weather_trend_match': False,
            'minutes_ago': 24
        }),
        'description': 'High thermal radiation detected. Plumes of black smoke visible within a 3km radius.',
    },
]

@incidents_bp.route('/api/incidents', methods=['GET'])
def get_incidents():
    """Retrieve all active disaster incidents with AI truth scores."""
    return jsonify({
        'status': 'success',
        'count': len(INCIDENTS_STORE),
        'data': INCIDENTS_STORE,
        'disclaimer': 'Simulated disaster data for development & testing',
    }), 200

@incidents_bp.route('/api/incidents', methods=['POST'])
def create_incident():
    """Ingest a new citizen report, execute Truth Engine verification, and store."""
    payload = request.get_json() or {}
    
    # Validation
    if not payload.get('type') or not payload.get('coordinates'):
        return jsonify({
            'status': 'error',
            'message': 'Missing required fields: hazard type and coordinates are mandatory.'
        }), 400

    import random
    new_id = f"INC-2026-{random.randint(100, 999)}"
    
    # Evaluate with AI Truth Engine
    truth_eval = evaluate_incident_reliability({
        'type': payload.get('type'),
        'has_photo': bool(payload.get('photo_url') or payload.get('has_photo')),
        'image_score': payload.get('image_score', 0.85),
        'nearby_reports_count': payload.get('nearby_reports_count', 1),
        'weather_trend_match': payload.get('weather_trend_match', True),
        'minutes_ago': 2,
    })

    new_incident = {
        'id': new_id,
        'type': payload.get('type'),
        'title': payload.get('title', f"Ground Report: {payload.get('type')}"),
        'location_name': payload.get('location_name', 'Pinned Coordinate Location'),
        'coordinates': payload.get('coordinates'),
        'severity': payload.get('severity', 'Moderate'),
        'status': 'Active',
        'reported_at': 'Just now',
        'affected_estimate': payload.get('affected_estimate', 5),
        'verification': truth_eval,
        'description': payload.get('description', 'No additional details provided.'),
    }

    INCIDENTS_STORE.insert(0, new_incident)

    return jsonify({
        'status': 'success',
        'message': 'Incident logged and evaluated successfully.',
        'data': new_incident,
    }), 201
