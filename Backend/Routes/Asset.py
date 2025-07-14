from flask import Blueprint , request, jsonify  # Flask is used to create the API and handle HTTP requests/responses
from db import cursor

asset_bp = Blueprint('asset',__name__)  #Blueprint name

@asset_bp.route('/asset', methods=['GET'])
def get_asset():
        cursor.execute("SELECT * FROM assets")
        data = cursor.fetchall()
        return jsonify(data)
