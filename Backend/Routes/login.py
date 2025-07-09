from flask import Blueprint , request, jsonify  # Flask is used to create the API and handle HTTP requests/responses
from db import cursor

login_bp = Blueprint('login',__name__)  #Blueprint name

@login_bp.route("/Login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

     # Check user in DB
    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"success": True, "user": user})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})
