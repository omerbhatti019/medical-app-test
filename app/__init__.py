from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from config import Config
from flask_cors import CORS

db = SQLAlchemy()
app = Flask(__name__)
CORS(app)


def create_app():
    app.config.from_object('config.Config')

    db.init_app(app)

    from .routes.patients import patients_bp
    from .routes.billing import billing_bp
    from .routes.claims import claims_bp
    from .cli_commands import register_commands
    
    register_commands(app) # Call the function to register the commands
    app.register_blueprint(patients_bp, url_prefix="/patients")
    app.register_blueprint(billing_bp, url_prefix="/billing")
    app.register_blueprint(claims_bp, url_prefix="/claims")
    
    return app