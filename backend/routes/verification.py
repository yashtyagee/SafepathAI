from flask import Blueprint, jsonify, request
from services.truth_engine import evaluate_incident_reliability

verification_bp = Blueprint('verification', __name__)

@verification_bp.route('/api/verify', methods=['POST'])
def test_verification():
    """
    Direct endpoint for testing the AI Truth Engine multi-signal scoring model.
    Accepts scenario signals and returns full mathematical attribution.
    """
    payload = request.get_json() or {}
    evaluation = evaluate_incident_reliability(payload)
    return jsonify({
        'status': 'success',
        'evaluation': evaluation
    }), 200
