from flask import Blueprint , request, jsonify  # Flask is used to create the API and handle HTTP requests/responses
from db import cursor,conn

asset_bp = Blueprint('asset',__name__)  #Blueprint name

@asset_bp.route('/asset', methods=['GET'])
def get_asset():
        cursor.execute("SELECT * FROM assets")
        data = cursor.fetchall()
        return jsonify(data)

@asset_bp.route('/add_asset', methods=['POST'])
def add_asset():
    data = request.get_json()
    cursor.execute("INSERT INTO assets (name, category, status, purchase_date, assigned_to) VALUES (%s, %s, %s, %s, %s)",
                   (data['name'], data['category'], data['status'], data['purchase_date'], data['assigned_to']))
    conn.commit()
    return jsonify({"message": "Asset added successfully"})


