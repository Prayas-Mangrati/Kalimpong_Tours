import AdminPlaceCard from "../components/AdminPlaceCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
export default function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:8080/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        showToast("An error occurred while fetching places", "error");
      }
    }
    fetchPlaces();
  }, []);

  const hotel = places.filter((place) => place.type === "hotel");
  const homestay = places.filter((place) => place.type === "homestay");
  const tourist = places.filter((place) => place.type === "tourist");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this place?",
    );

    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:8080/admin/place/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      setPlaces((prev) => prev.filter((place) => place._id !== id));
      showToast("Place deleted successfully", "success");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-gradient">
        <header className="border-gradient-inner text-white p-4 h-16 flex items-center rounded-lg">
          <h1 className="text-xl font-bold brand-text-glow whitespace-nowrap">
            Admin Dashboard
          </h1>
          <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded border-2 border-white brand-text-glow whitespace-nowrap">
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
          <div className="border-gradient rounded-lg">
            <div className="border-gradient-inner p-4 rounded-lg">
              <h2>Total Places Analytics</h2>
            </div>
          </div>
          <div className="border-gradient rounded-lg">
            <div className="border-gradient-inner p-4 rounded-lg">
              <h2>Total Visitors</h2>
            </div>
          </div>
          <div className="border-gradient rounded-lg">
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
            <div className="border-2 border-white bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded inline-block brand-text-glow whitespace-nowrap" onClick={() => navigate("/admin/add-place")}>
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
                  <AdminPlaceCard key={place._id} data={place} onDelete={handleDelete}/>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-center">
                Tourist Attractions
              </h2>
              <div className="flex flex-col gap-3">
                {tourist.map((place) => (
                  <AdminPlaceCard key={place._id} data={place} onDelete={handleDelete}/>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-center">
                Homestays
              </h2>
              <div className="flex flex-col gap-3">
                {homestay.map((place) => (
                  <AdminPlaceCard key={place._id} data={place} onDelete={handleDelete}/>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
