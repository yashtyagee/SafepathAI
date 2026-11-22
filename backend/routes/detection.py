from flask import Blueprint, jsonify, request
import random

detection_bp = Blueprint('detection', __name__)

@detection_bp.route('/api/detect-hazard', methods=['POST'])
def detect_hazard():
    """
    Simulates Transfer Learning CNN inference (ResNet-50 / EfficientNet)
    fine-tuned on FloodNet and xBD satellite/aerial imagery.
    """
    payload = request.get_json() or {}
    hazard_hint = payload.get('hazard_type', 'Flood').lower()

    # Model evaluation simulation
    if 'flood' in hazard_hint:
        probabilities = {
            'standing_water_flood': 0.94,
            'submerged_roadway': 0.88,
            'fire_combustion': 0.02,
            'structural_damage': 0.42,
            'smoke_plume': 0.01,
        }
        primary_class = 'Severe Water Inundation (FloodNet Class 2)'
        severity = 'High'
    elif 'fire' in hazard_hint:
        probabilities = {
            'standing_water_flood': 0.01,
            'submerged_roadway': 0.03,
            'fire_combustion': 0.96,
            'structural_damage': 0.65,
            'smoke_plume': 0.91,
        }
        primary_class = 'Active Thermal Combustion & Dense Smoke'
        severity = 'Critical'
    elif 'landslide' in hazard_hint or 'structural' in hazard_hint:
        probabilities = {
            'standing_water_flood': 0.15,
            'submerged_roadway': 0.72,
            'fire_combustion': 0.03,
            'structural_damage': 0.93,
            'smoke_plume': 0.12,
        }
        primary_class = 'Structural Collapse & Road Obstruction (xBD Tier 3)'
        severity = 'Critical'
    else:
        probabilities = {
            'standing_water_flood': 0.05,
            'submerged_roadway': 0.04,
            'fire_combustion': 0.01,
            'structural_damage': 0.08,
            'smoke_plume': 0.02,
        }
        primary_class = 'Normal Baseline (No Critical Hazard Detected)'
        severity = 'Low'

    return jsonify({
        'status': 'success',
        'model_metadata': {
            'architecture': 'ResNet-50 Transfer Learning Backbone',
            'weights': 'ImageNet Pretrained -> FloodNet/xBD Fine-Tuned',
            'input_resolution': '512x512 RGB',
            'inference_time_ms': 48,
        },
        'primary_classification': primary_class,
        'detected_severity': severity,
        'class_probabilities': probabilities,
        'confidence_score': max(probabilities.values()),
        'disclaimer': 'Simulated CNN inference for development and testing',
    }), 200
