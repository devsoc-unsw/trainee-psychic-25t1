# 25t1-training-project: PSYCHIC

Repo for Psychic (Group 5)'s Team Project!

Our team made a minigame platform, where users can log in, play singleplayer minigames, and compete against other players' records with the leaderboards.

### Setup

1. Install Docker.
2. Get the `.env` file from one of our teammates, and place it inside the `backend/` folder.
3. Run `docker compose up --build` to compile
4. To run this again after compiling, run `docker compose up`, without the `--build`.

### Tech Stack

- Backend: Flask
    - Libraries: `flask-cors`, `flask-bcrypt`, `flask-jwt-extended`, `python-dotenv`, `mysql-connector-python`
- Frontend: Next.js
    - Libraries: `axios`
- Database: MySQL
    - Hosted on Railway
