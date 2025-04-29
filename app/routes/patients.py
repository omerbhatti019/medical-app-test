from flask import Flask, Blueprint, request, jsonify
from flask_restful import Api, Resource
from ..models import db, Patient

patients_bp = Blueprint("patients", __name__)
api = Api(patients_bp)
app = Flask(__name__)

# Initialize the Flask app and API
class PatientResource(Resource):
    def get(self, patient_id=None): # Get patient by ID
        if patient_id is None:
            patients = Patient.query.all()
            return [{"id": p.id, "name": p.name} for p in patients]
        else:
            patient = Patient.query.get_or_404(patient_id)
            return {"id": patient.id, "name": patient.name}


@patients_bp.route("/patient", methods=["POST"])
def add_patient():
    data = request.get_json()
    patient = Patient(name=data["name"], insurance_id=data["insurance_id"])
    db.session.add(patient)
    db.session.commit()
    return jsonify({"message": "Patient added"}), 201
#api.add_resource(PatientResource, '/patients', '/patients/<int:patient_id>')

@patients_bp.route("/get_patients", methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([
        {
        'id': p.id,
        'name': p.name,
        'insurance_id': p.insurance_id  # Ensure insurance_id is accessed correctly
        }
        for p in patients
    ])

