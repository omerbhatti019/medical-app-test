from flask import current_app
from app.models import db, Patient, Bill
import click

def register_commands(app):
    @click.command("seed")
    def seed():
        """Insert sample data into the database."""
        with current_app.app_context():
            try:
                db.create_all()

                if not Patient.query.first():
                    patient1 = Patient(name="Harvey Specter")
                    patient2 = Patient(name="Donna Paulsen")

                    db.session.add_all([patient1, patient2])
                    db.session.commit()

                    invoice1 = Bill(amount=300.0, patient_id=patient1.id)
                    invoice2 = Bill(amount=450.0, patient_id=patient2.id)

                    db.session.add_all([invoice1, invoice2])
                    db.session.commit()

                    print("✅ Sample data inserted successfully!")
                else:
                    print("ℹ️ Sample data already exists. Skipping.")

            except Exception as e:
                db.session.rollback()
                print(f"❌ Error while inserting sample data: {e}")
            finally:
                db.session.close()

    # Register the 'seed' command
    app.cli.add_command(seed)
