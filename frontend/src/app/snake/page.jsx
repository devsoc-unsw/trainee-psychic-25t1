export default function SnakeGame() {

  return (
    <div className="text-center">
      <canvas className="w-[500] h-[500] border-solid border-3"></canvas>
      <div className="text-8xl">0</div>
      <button className="text-2xl btn btn-primary w-[100] h-[50]">
        Reset
      </button>
    </div>
  );

}