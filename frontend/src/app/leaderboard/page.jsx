import LeaderBoard from "./leaderboard"
import data from "./dummy_data.json";


export default function LeaderboardPage() {
    return (
        // website "box"
        <div className="flex flex-col space-x-4">
            <div>
                <h1 className="text-center text-3xl">⭐️Leaderboard⭐️</h1>
                <LeaderBoard scores={data}/>
            </div>
        </div>
    )

}