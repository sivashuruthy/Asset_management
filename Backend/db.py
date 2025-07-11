import mysql.connector # To connect and interact with the MySQL database

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Csnathan@19",
    database="asset_management"
)
cursor = conn.cursor(dictionary=True)