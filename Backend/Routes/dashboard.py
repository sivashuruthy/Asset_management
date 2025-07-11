from flask import Blueprint , request, jsonify  # Flask is used to create the API and handle HTTP requests/responses
from db import cursor

dashboard_bp = Blueprint('dashboard',__name__)  #Blueprint name

@dashboard_bp.route('/dashboard', methods=['GET'])
def get_asset_summary():
    queries = {
        "total": "SELECT COUNT(*) AS count FROM assets",
        "assigned": "SELECT COUNT(*) AS count FROM assets WHERE status = 'assigned'",
        "unassigned": "SELECT COUNT(*) AS count FROM assets WHERE status = 'unassigned'",
        "faulty": "SELECT COUNT(*) AS count FROM assets WHERE status IN ('faulty', 'expired')"
    }

    result = {}
    for key, query in queries.items():
        cursor.execute(query)
        count = cursor.fetchone()['count']
        result[key] = count

    return jsonify(result)