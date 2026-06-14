import AdminPlaceCard from "../components/AdminPlaceCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function AdminDashboard() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalPlaces: 0,
    hotel: 0,
    homestay: 0,
    tourist: 0,
  });
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:8080/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        showToast(
          "An error occurred while fetching places",
          "error",
          "circle-xmark",
        );
      }
    }
    fetchPlaces();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/dashboard/stats",
      );
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = {
    labels: ["Tourist Attractions", "Hotels", "Homestays"],
    datasets: [
      {
        data: [stats.tourist, stats.hotel, stats.homestay],
        backgroundColor: ["#3B82F6", "#A855F7", "#22C55E"],
        borderWidth: 0,
      },
    ],
  };

  const hotel = places.filter((place) => place.type === "hotel");
  const homestay = places.filter((place) => place.type === "homestay");
  const tourist = places.filter((place) => place.type === "tourist");

  const confirmDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/admin/place/${placeToDelete._id}`,
      {
        method: "DELETE",
      },
    );
    const result = await response.json();
    if (result.success) {
      setPlaces((prev) =>
        prev.filter((place) => place._id !== placeToDelete._id),
      );
      await fetchStats();
      showToast("Place deleted successfully", "success", "trash");

    }
    setShowDeleteModal(false);
    setPlaceToDelete(null);
  };

  const handleDelete = async (data) => {
    setPlaceToDelete(data);
    setShowDeleteModal(true);
    return;

    const response = await fetch(`http://localhost:8080/admin/place/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      setPlaces((prev) => prev.filter((place) => place._id !== id));
      showToast("Place deleted successfully", "success", "trash");
     
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");

    showToast("Logged out successfully!", "success", "right-from-bracket");

    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-gradient">
        <header className="border-gradient-inner text-white p-4 h-16 flex items-center rounded-lg">
          <h1 className="text-xl font-bold brand-text-glow whitespace-nowrap">
            Admin Dashboard
          </h1>
          <button
            className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded border-2 border-white brand-text-glow whitespace-nowrap"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>
      </div>
      <div className="flex justify-center p-6">
        <div className="border-gradient">
          <div className="border-gradient-inner p-4 rounded-lg flex flex-row">
            <img
              src="/kai_face.jpeg"
              alt="K-AI"
              className="w-10 h-10 rounded-full mr-4 object-cover white-shadow"
            />
            <div>
              <h2 className="text-lg font-semibold">
                Welcome to the Admin Dashboard
              </h2>
              <p className="text-sm text-white/70">
                Manage destinations, hotels, homestays and tourist attractions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-6 justify-center p-6">
          <div className="border-gradient rounded-xl flex-1 max-w-[360px] h-[360px]">
            <div className="border-gradient-inner rounded-xl p-5 h-full flex flex-col items-center">
              <h2 className="text-xl font-bold text-white mb-4">
                Total Places Analytics
              </h2>

              <div className="w-40 h-40">
                <Doughnut
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        display: false,
                        labels: {
                          color: "white",
                          boxWidth: 15,
                          padding: 12,
                        },
                      },
                    },
                  }}
                  data={chartData}
                />
                <div className="mt-4 space-y-1 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Tourist Attractions: {stats.tourist}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span>Hotels: {stats.hotel}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Homestays: {stats.homestay}</span>
                  </div>
                 
                </div>
                 <div><p className="mt-4 text-xl font-bold text-white">
                    Total Places: {stats.totalPlaces}
                  </p></div>
              </div>
            </div>
          </div>
          <div className="border-gradient rounded-lg flex-1 max-w-[360px] h-[360px]">
            <div className="border-gradient-inner p-4 rounded-lg">
              <h2>Total Visitors</h2>
            </div>
          </div>
          <div className="border-gradient rounded-lg flex-1 max-w-[360px] h-[360px]">
            <div className="border-gradient-inner p-4 rounded-lg">
              <h2>Manage Destinations</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="border-gradient m-2">
        <div className="border-gradient-inner p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <i
              className="fa-solid fa-map-pin fa-2xl fa-border-white brand-text-glow whitespace-nowrap"
              style={{ color: "rgb(224, 22, 22)" }}
            ></i>
            <h1 className="text-2xl font-semibold text-center mt-2 brand-text-glow whitespace-nowrap">
              Available Places
            </h1>
            <div
              className="border-2 border-white bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded inline-block brand-text-glow whitespace-nowrap"
              onClick={() => navigate("/admin/add-place")}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="ml-1 ">Add New</span>
            </div>
          </div>
          <hr className="border-white border-2 m-4" />
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 rounded-lg ">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-center">Hotels</h2>
              <div className="flex flex-col gap-3">
                {hotel.map((place) => (
                  <AdminPlaceCard
                    key={place._id}
                    data={place}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-center">
                Tourist Attractions
              </h2>
              <div className="flex flex-col gap-3">
                {tourist.map((place) => (
                  <AdminPlaceCard
                    key={place._id}
                    data={place}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-center">
                Homestays
              </h2>
              <div className="flex flex-col gap-3">
                {homestay.map((place) => (
                  <AdminPlaceCard
                    key={place._id}
                    data={place}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="border-gradient rounded-2xl w-[90%] max-w-md shadow-2xl">
            <div className="border-gradient-inner rounded-2xl p-6 text-center">
              <i className="fa-solid fa-triangle-exclamation text-yellow-400 text-5xl mb-4"></i>

              <h2 className="text-2xl font-semibold text-white">
                Delete{" "}
                <span className="text-red-400">"{placeToDelete?.title}"</span>?
              </h2>

              <p className="mt-3 text-gray-300">
                This action cannot be undone.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setPlaceToDelete(null);
                  }}
                  className="px-5 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
