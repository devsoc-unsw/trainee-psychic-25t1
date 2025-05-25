import logging

from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

logging.basicConfig(level=logging.INFO,filename='log.log', filemode='w')

CONFIG = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT')),
    'database': os.getenv('DB_NAME')
}

score_bp = Blueprint('score', __name__)
bcrypt = Bcrypt()

# Black magic which connects to database
def get_db_connection():
    return mysql.connector.connect(**CONFIG)


@score_bp.route('/scores/upload', methods=['POST'])
@jwt_required()
def upload_score():
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

@score_bp.route('/scores/game', methods=['GET'])
@jwt_required()
def get_scores_by_game():
    # current_user_id = get_jwt_identity()
    data = request.get_json()
    
    game_id = data['game_id']

    # pull the scores from the database
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # check if game exists
        get_game_query = "select * from Games where id = %s"
        cursor.execute(get_game_query, (game_id, ))

        game = cursor.fetchone()
        if not game:
            return jsonify({"msg": "Game not found."}), 404

        # get all the scores.
        get_scores_query = """select * from Scores where game_id = %s"""
        cursor.execute(get_scores_query, (game_id,))

        scores = cursor.fetchall()

        conn.commit()
        return jsonify({scores})

    except Exception as e:
        print(f"Error {e}")
        return jsonify({"msg": "Interal server error"}), 500
    finally:
        cursor.close()
        conn.close()

@score_bp.route('/scores/user', methods=['GET'])
@jwt_required()
def get_scores_by_user():
    current_user_id = get_jwt_identity()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # fetch all of the scores related to the user
        query = """select SUM(score) from Scores where user_id = %s"""
        cursor.execute(query, (current_user_id, ))
        scores = cursor.fetchone()[0] or 0
        conn.commit()
        return jsonify({scores})

    except Exception as e:
        print(f"Error {e}")
        return jsonify({"msg": "Error"}), 500
    finally:
        cursor.close()
        conn.close()


@score_bp.route('/scores/user/most_played', methods=['GET'])
@jwt_required()
def get_most_played_game_by_user():
    current_user_id = get_jwt_identity()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # query looks cursed but oh well
        query = """select game_id from (
            select game_id, count(*) from scores where user_id = %s
            group by game_id
        ) where count = (
            select max(count) from (
                select game_id, count(*) from scores where user_id = %s
                group by game_id
            )
        )"""

        cursor.execute(query, (current_user_id, current_user_id))
        most_played_game = cursor.fetchone()
        conn.commit()
        return jsonify({most_played_game})
    except Exception as e:
        print(f"Error {e}")
        return jsonify({"msg": "Error"}), 500
    finally:
        cursor.close()
        conn.close()


@score_bp.route('/scores/get', methods=['GET'])
@jwt_required()
def get_scores():
    current_user_id = get_jwt_identity()
    # data = request.get_json()

    print("hi")

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """select s.user_id, u.name, sum(score) from Scores s
        join Users u on
        u.id = s.user_id
        group by s.user_id, u.name"""

        cur.execute(query)

        res = cur.fetchall()
        conn.commit()
        print("hey")
        print(res)

        for item in res:
            print(item)

        scores_list = [{"username": row[1], "score": row[2]} for row in res]
        return jsonify({"scores": scores_list})
    except Exception as e:
        print(f"Error {e}")
        return jsonify({"msg": e}), 500
    finally:
        cur.close()
        conn.close()
