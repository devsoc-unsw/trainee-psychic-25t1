export default function Popup({ display, close, content }) {
  if (!display) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={close}/>
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
        {content}
        <button onClick={close} className="absolute top-2 right-4 text-gray-500 hover:text-black font-extrabold text-3xl">
          ×
        </button>
      </div>
    </div>
  );
}
