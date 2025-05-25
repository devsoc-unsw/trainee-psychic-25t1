import axios from "axios";

export async function uploadGameScore(score, game_id) {
  if (score > 0) {
    try {
      await axios.post(
        "http://localhost:8000/scores/upload",
        { game_id, score },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to retrieve scores:", error);
    }
  }
}
