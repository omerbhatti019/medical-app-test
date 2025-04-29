from flask import Blueprint, request, jsonify
from ..models import db, Bill

billing_bp = Blueprint("billing", __name__)

@billing_bp.route("/", methods=["POST"])
def create_bill():
    billing_fields = ['patient_id', 'amount', 'status']
    data = request.get_json()
    missing_fields = [field for field in billing_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing field(s): {', '.join(missing_fields)}"}), 400

    try:
        bill = Bill(patient_id=data["patient_id"], amount=data["amount"], status="pending")
        db.session.add(bill)
        db.session.commit()
        return jsonify({"message": "Bill created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@billing_bp.route("/<int:bill_id>", methods=["GET"])
def get_bill(bill_id):
    bill = Bill.query.get_or_404(bill_id)
    return jsonify({
        "id": bill.id,
        "patient_id": bill.patient_id,
        "amount": bill.amount,
        "status": bill.status
    })
