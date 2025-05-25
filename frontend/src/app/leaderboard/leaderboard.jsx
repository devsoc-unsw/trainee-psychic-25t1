import axios from "axios";
import { useState } from "react";

export default function LeaderBoard() {
  const [scores, setScores] = useState([]);

  function organise_data() {
    getScores();

    let clonedArray = JSON.parse(JSON.stringify(scores));

    return [...clonedArray].map((item, index) => (
      <tr key={item.id}>
        <th>{index + 1}</th>
        <td>{item.username}</td>
        <td>{item.score}</td>
      </tr>
    ));
  }

  async function getScores() {
    try {
      const response = await axios.get("http://localhost:8000/scores/get", {
        withCredentials: true,
      });
      setScores(response.data.scores);
    } catch (error) {
      console.error("Failed to upload score: ", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {organise_data()}
        </tbody>
      </table>
    </div>
  );
}
