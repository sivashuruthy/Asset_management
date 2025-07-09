from flask import Flask  # Flask is used to create the API and handle HTTP requests/responses
from flask_cors import CORS # CORS is used to allow cross-origin requests from the frontend
from Routes.register import register_bp #import Blueprint
from Routes.login import login_bp

# Initialize Flask app
app = Flask(__name__) 
CORS(app)  # Allow the React frontend (or any frontend) to make requests to this backend


# Register route blueprint
app.register_blueprint(register_bp)

app.register_blueprint(login_bp)

if __name__ == "__main__":
    app.run(debug=True)

