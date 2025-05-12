from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

CONFIG = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT')),
    'database': os.getenv('DB_NAME')
}

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Black magic which connects to database
def get_db_connection():
    return mysql.connector.connect(**CONFIG)

"""
    Upload the game score
    ---
    Uploads the score for the given game_id, using the JWT

    Request body (JSON):
    -   score (int): The score of the game
    - game_id (int): The game_id of the score

    Response:
    - 201 Created: Score uploaded successfully
    - 400 Bad Request: Missing game_id or score
    - 401 Unauthorized: Invalid credentials
    - 404 Not Found: No game_id found with the given game_id
    - 500 Internal Server Error: Database or server error
"""
@auth_bp.route('/scores/upload', methods=['POST'])
@jwt_required()
def upload_score():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    if not data or 'game_id' not in data or 'score' not in data:
        return jsonify({"msg": "Missing game_id or score in request body."}), 400

    game_id = data['game_id']
    score = data['score']

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if the game exists
        cursor.execute("select id from Games where id = %s", (game_id,))
        game = cursor.fetchone()
        if not game:
            return jsonify({"msg": "Game not found."}), 404

        # Insert score into Scores table
        cursor.execute(
            "insert into Scores (user_id, game_id, score) values (%s, %s, %s)",
            (current_user_id, game_id, score)
        )
        conn.commit()

        return jsonify({"msg": "Score uploaded successfully."}), 201
    except Exception as e:
        print(f"Exception during score upload: {e}")
        return jsonify({"msg": "Internal server error."}), 500
    finally:
        cursor.close()
        conn.close()

@auth_bp.route('/scores/game', methods=['GET'])
@jwt_required()
def get_scores_by_game():
    current_user_id = get_jwt_identity()
    
    # TODO: Return all the scores related to game_id in JSON.

@auth_bp.route('/scores/user', methods=['GET'])
@jwt_required()
def get_scores_by_game():
    current_user_id = get_jwt_identity()
    
    # TODO: Return all the scores related to current_user_id in JSON.


