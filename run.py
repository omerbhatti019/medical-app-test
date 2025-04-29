from flask import Flask, request, jsonify
from app import create_app
from flask_migrate import Migrate
from app.models import db
from app.cli_commands import register_commands

app = create_app()
migrate = Migrate(app,db)


@app.route('/')
def create_app():
    return "Welcome to the Healthcare Management System2!"


@app.route('/health')
def health():
    return "System is up and running!"

@app.route('/handle_params', methods=['GET','POST'])
def handle_param():
    if request.method == 'GET':
        return f"You made a GET request with params: \n",200
    elif request.method == 'POST':
        return f"You made a POST request with data:\n"
    else:
        return "Unsupported request method", 405

if __name__ == "__main__":
    app.run(debug=True,use_reloader=False)

