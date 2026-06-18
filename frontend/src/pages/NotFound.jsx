import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="border-gradient rounded-xl w-full max-w-lg">
        <div className="border-gradient-inner rounded-xl p-8 text-center text-white">
          <h1 className="text-7xl font-bold brand-text-glow mb-4">404</h1>
          <div className="flex items-center justify-center gap-8 mb-6">
            <img
              src="/kpg_tour_logo.png"
              alt="Kalimpong Logo"
              className="w-24 h-24 object-contain brand-text-glow"
            />

            <i className="fa-solid fa-map-location-dot text-6xl text-red-500 brand-text-glow"></i>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Destination Not Found</h2>

          <p className="text-gray-300 mb-6">
            Looks like you're lost in the hills of Kalimpong. The page you're
            looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
