# seed.py
from app import create_app, db
from app.models import Patient, Bill

app = create_app()

with app.app_context():
    try:
        db.create_all()

        if not Patient.query.first():
            patient1 = Patient(name="Harvey Specter")
            patient2 = Patient(name="Donna Paulsen")

            with db.session.begin():  # Use context manager for session
                db.session.add_all([patient1, patient2])

            invoice1 = Bill(amount=300.0, patient_id=patient1.id)
            invoice2 = Bill(amount=450.0, patient_id=patient2.id)

            with db.session.begin():  # Use context manager for session
                db.session.add_all([invoice1, invoice2])

            print("✅ Sample data inserted successfully!")
        else:
            print("ℹ️ Sample data already exists. Skipping.")

    except Exception as e:
        print(f"❌ Error while inserting sample data: {e}")
        print("ℹ️ Rolling back the session...")
        db.session.rollback()
        db.session.remove()
    finally:
        db.session.close()
        print("✅ Session closed.")
