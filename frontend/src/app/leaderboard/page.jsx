import LeaderBoard from "./leaderboard";
import data from "./dummy_data.json";

export default function LeaderboardPage() {
  return (
  // website "box"
    <div className="flex flex-col space-x-4">
      <div>
        <LeaderBoard scores={data}/>
      </div>
    </div>
  );
}