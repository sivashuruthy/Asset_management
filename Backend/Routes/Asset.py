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

@asset_bp.route('/update_asset/<int:asset_id>', methods=['PUT'])
def edit_asset(asset_id):
        data = request.get_json()
        name = data.get('name')
        category = data.get('category')
        status = data.get('status')
        purchase_date = data.get('purchase_date')
        assigned_to = data.get('assigned_to')
        query = """
        UPDATE assets 
        SET name=%s, category=%s, status=%s, purchase_date=%s, assigned_to=%s 
        WHERE asset_id=%s
    """
        cursor.execute(query,(name, category, status, purchase_date, assigned_to, asset_id))
        conn.commit()
        return jsonify({"message": "Asset updated successfully"})




