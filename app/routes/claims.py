from flask import Blueprint, jsonify,request
from ..services.claim_submission import submit_claim
from ..models import Claims
from app.services import claim_submission

claims_bp = Blueprint("claims", __name__)

"""@claims_bp.route("/submit/<int:patient_id>", methods=["POST"])
def claim_submit(patient_id):
    data = request.get_json()

    # Check for missing 'status' and 'amount' fields in the body, but don't check for 'patient_id' in the body
    if not data or 'status' not in data or 'amount' not in data:
        return jsonify({"error": "Invalid input, status and amount are required"}), 400
    
    # Use the patient_id from the URL parameter
    new_claim = submit_claim(
        patient_id=patient_id,  # Use patient_id from the URL
        status=data['status'],
        amount=data['amount']
    )

    return jsonify({
        "patient_id": new_claim.patient.id,
        "status": new_claim.status,
        "amount": new_claim.amount
    }), 201"""

@claims_bp.route("/submit/<int:patient_id>", methods=["POST"])
def claim_submit(patient_id):
    data = request.get_json()
    if not data or 'status' not in data:
        return jsonify({"error": "Invalid input"}), 400
    new_claim = submit_claim(
        patient_id=patient_id,
        status=data['status'],
        amount=data['amount']
    )
    return jsonify({"patient_id":new_claim.patient_id, "status": new_claim.status, "amount": new_claim.amount}), 201

@claims_bp.route("/get_claims", methods=['GET'])
def get_claims():
    claims = Claims.query.all()
    return jsonify([
        {'id': c.id, 'status': c.status, 'amount':c.amount}
        for c in claims
    ])