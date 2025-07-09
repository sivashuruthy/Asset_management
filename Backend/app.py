from flask import Flask, request, jsonify  #to import flask to access api calls
from flask_cors import CORS # 
import mysql.connector #

app = Flask(__name__) 
CORS(app)  # Allow frontend to connect

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Csnathan@19",
    database="asset_management"
)
cursor = conn.cursor()


# api call to 
@app.route("/Register", methods=["POST"])
def register():
    data = request.get_json()
    InputName = data["InputName"]
    InputEmail = data["InputEmail"]
    InputPassword = data["InputPassword"]

    cursor.execute("SELECT * FROM users WHERE email = %s", (InputEmail,))
    if cursor.fetchone():
        return jsonify({"status": "error", "message": "User already exists"})

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                   (InputName, InputEmail, InputPassword))
    conn.commit()
    return jsonify({"status": "success", "message": "User registered successfully"})

if __name__ == "__main__":
    app.run(debug=True)
