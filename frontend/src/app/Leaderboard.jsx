import LeaderboardPage from "./leaderboard/page";

export default function LeaderboardModal() {
  return (
    <div>
      <dialog id="leaderboardModal" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5.5">✕</button>
          </form>
          <h3 className="font-bold text-lg">⭐️Leaderboard⭐️</h3>
          <LeaderboardPage />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}