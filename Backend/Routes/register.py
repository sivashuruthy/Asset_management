from flask import Blueprint , request, jsonify  # Flask is used to create the API and handle HTTP requests/responses
from db import cursor,conn

register_bp = Blueprint('register',__name__)  #Blueprint name

@register_bp.route("/Register", methods=["POST"])
def register():
    data = request.get_json()
    InputName = data["InputName"]
    InputEmail = data["InputEmail"]
    InputPassword = data["InputPassword"]

    # Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (InputEmail,))
    if cursor.fetchone():
        return jsonify({"status": "error", "message": "User already exists"})

     # Insert into DB
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                   (InputName, InputEmail, InputPassword))
    conn.commit()
    return jsonify({"status": "success", "message": "User registered successfully"})

