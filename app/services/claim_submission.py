from app.models import Claims,db

def submit_claim(patient_id, status, amount):
    # Placeholder for EDI submission logic
    new_claim = Claims(patient_id=patient_id, status=status, amount=amount)
    db.session.add(new_claim)
    db.session.commit()

    print(f"Submitting claim for patient {patient_id}")
    return new_claim