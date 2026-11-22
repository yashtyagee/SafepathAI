"""
SafePath AI — AI Truth Engine Verification Service
Stage 3: Crowd Incident Reliability Estimation

Implements an explainable multi-signal confidence engine combining:
1. Spatial Proximity & Density (nearby corroboration within 5km radius)
2. Temporal Consistency (report recency vs event progression)
3. Satellite Hazard Correlation (FIRMS hotspot / IMERG rainfall match)
4. Visual CNN Pre-Classification (presence of flood water, smoke, or structural debris)
5. Weather Anomaly Thresholds
"""

def evaluate_incident_reliability(incident_data):
    """
    Evaluates raw report attributes and returns a bounded confidence score (0.0 - 1.0)
    with complete mathematical attribution.
    """
    signals = {}
    weights = {
        'satellite_match': 0.25,
        'image_evidence': 0.25,
        'spatial_corroboration': 0.20,
        'weather_anomaly': 0.15,
        'temporal_recency': 0.15,
    }

    # 1. Satellite Cross-Check (Simulated lookup against FIRMS / GPM IMERG)
    # Fire incidents check FIRMS hotspot coverage; floods check IMERG high precipitation
    h_type = incident_data.get('type', '').lower()
    has_satellite_hit = incident_data.get('satellite_detected', False)
    
    # Defaults based on hazard if not explicitly passed
    if 'fire' in h_type:
        signals['satellite_match'] = 0.95 if has_satellite_hit else 0.50
    elif 'flood' in h_type:
        signals['satellite_match'] = 0.90 if has_satellite_hit else 0.40
    else:
        signals['satellite_match'] = 0.60

    # 2. Image Evidence Analysis
    has_photo = incident_data.get('has_photo', False)
    if has_photo:
        # Pretrained CNN confidence simulation
        signals['image_evidence'] = float(incident_data.get('image_score', 0.88))
    else:
        signals['image_evidence'] = 0.35 # Penalized for lack of visual proof

    # 3. Spatial Corroboration (Number of reports within 5km)
    nearby_reports = int(incident_data.get('nearby_reports_count', 1))
    if nearby_reports >= 5:
        signals['spatial_corroboration'] = 1.0
    elif nearby_reports >= 3:
        signals['spatial_corroboration'] = 0.85
    elif nearby_reports >= 2:
        signals['spatial_corroboration'] = 0.70
    else:
        signals['spatial_corroboration'] = 0.45 # Single uncorroborated report

    # 4. Weather Sensor Match
    weather_match = incident_data.get('weather_trend_match', True)
    signals['weather_anomaly'] = 0.90 if weather_match else 0.30

    # 5. Temporal Recency (Fresh reports get higher confidence)
    minutes_ago = int(incident_data.get('minutes_ago', 10))
    if minutes_ago <= 30:
        signals['temporal_recency'] = 0.95
    elif minutes_ago <= 120:
        signals['temporal_recency'] = 0.80
    else:
        signals['temporal_recency'] = 0.50

    # Compute Weighted Sum
    final_score = sum(signals[k] * weights[k] for k in weights)
    final_score = round(max(0.05, min(0.99, final_score)), 2)

    # Determine Verification Classification Status
    if final_score >= 0.80:
        status = 'Verified'
        recommendation = 'High confidence. Eligible for immediate dispatch prioritization.'
    elif final_score >= 0.55:
        status = 'Pending Review'
        recommendation = 'Moderate reliability. Awaiting secondary ground or aerial check.'
    else:
        status = 'Unverified'
        recommendation = 'Low confidence. Potential duplicate, anomalous, or uncorroborated event.'

    return {
        'confidence_score': final_score,
        'verification_status': status,
        'recommendation': recommendation,
        'signals': signals,
        'weights_applied': weights,
        'is_simulated_ai': True,
        'model_name': 'SafePath AI Truth Engine v1.0',
    }
