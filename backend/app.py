import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.incidents import incidents_bp
from routes.verification import verification_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable Cross-Origin Resource Sharing for React frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(incidents_bp)
    app.register_blueprint(verification_bp)

    @app.route('/', methods=['GET'])
    def root_index():
        return jsonify({
            'name': 'SafePath AI Disaster Intelligence Core API',
            'version': '1.0.0-prototype',
            'status': 'OPERATIONAL',
            'frontend_portal': 'http://localhost:5173',
            'endpoints': {
                'health': '/api/health',
                'incidents_list': 'GET /api/incidents',
                'incidents_create': 'POST /api/incidents',
                'truth_engine_verify': 'POST /api/verify',
            },
            'disclaimer': 'SafePath AI Research Prototype API. Not a replacement for official emergency services.'
        }), 200

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'system': 'SafePath AI Disaster Intelligence Core',
            'version': '1.0.0-prototype',
            'modules': {
                'truth_engine': 'active',
                'hazard_routing': 'ready',
                'incident_api': 'active',
            }
        }), 200

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"🚀 SafePath AI Flask Backend starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
