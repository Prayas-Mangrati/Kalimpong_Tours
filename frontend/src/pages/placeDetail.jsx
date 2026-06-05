import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const currentLocationIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function MapViewportController({ destination, userPosition }) {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      const bounds = L.latLngBounds([destination, userPosition]);
      map.fitBounds(bounds, { padding: [40, 40] });
      return;
    }

    map.setView(destination, 15);
  }, [map, destination, userPosition]);

  return null;
}

export default function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`${API_URL}/places/${id}`);

        if (!res.ok) {
          throw new Error(`Failed to load place (${res.status})`);
        }

        const data = await res.json();
        setPlace(data);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchPlace();
  }, [id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log("Location error", err);
      },
    );
  }, []);

  const hasCoordinates =
    Number.isFinite(place?.latitude) && Number.isFinite(place?.longitude);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!userPosition || !hasCoordinates) {
        setRoutePath([]);
        return;
      }

      const [userLat, userLng] = userPosition;
      const destinationLat = Number(place.latitude);
      const destinationLng = Number(place.longitude);

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destinationLng},${destinationLat}?overview=full&geometries=geojson`,
        );

        if (!response.ok) {
          throw new Error("Route API error");
        }

        const routeData = await response.json();
        const coordinates = routeData?.routes?.[0]?.geometry?.coordinates;

        if (!coordinates || coordinates.length === 0) {
          throw new Error("No route found");
        }

        const latLngPath = coordinates.map(([lng, lat]) => [lat, lng]);
        setRoutePath(latLngPath);
      } catch (routeError) {
        console.log("Route fetch failed", routeError);
        setRoutePath([
          [userLat, userLng],
          [destinationLat, destinationLng],
        ]);
      }
    };

    fetchRoute();
  }, [userPosition, place, hasCoordinates]);

  if (error) {
    return (
      <div className="text-white mt-80 ml-80">
        <h1>{error}</h1>
      </div>
    );
  }

  if (!place)
    return (
      <div className="text-white mt-80 ml-80">
        <h1>Loading...</h1>
      </div>
    );

  const destination = [Number(place.latitude), Number(place.longitude)];

  return (
    <>
      <Navbar />
      <div className="border-gradient mt-5 w-[92%] sm:w-[88%] lg:w-[80%] max-w-6xl mx-auto rounded-lg">
        <div className="text-white p-6 border-gradient-inner rounded-lg">
          <img
            src={place.img.url}
            alt={place.title}
            className="mt-8 border-gradient block mx-auto w-[86%] lg:w-[82%] h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover object-center rounded-xl shadow-lg"
          />

          <div className="flex justify-between items-center">
            <h1 className="text-3xl mt-10">{place.title}</h1>
            <button
              className="bg-red-500 border-2 rounded-md p-1 white-shadow"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
          <p className="text-gray-400">{place.location}</p>

          <p className="mt-4 text-xl">
            <i>{place.description}</i>
          </p>

          <p className="mt-8">{place.full_description}</p>

          <p className="mt-8">
            {place.type === "tourist" ? "Entry Fee: " : "Price: "}
            {place.price}
          </p>

          <p className="mt-10 mb-2 font-bold text-xl">Let's Get You There...</p>
          <div className="h-[400px] border-gradient rounded-lg ">
            {!hasCoordinates ? (
              <MapContainer>
                <div className="text-white mt-20 text-center">
                  <h1>Location coordinates are missing for this place.</h1>
                </div>
              </MapContainer>
            ) : (
              <MapContainer
                center={destination}
                zoom={15}
                maxZoom={19}
                scrollWheelZoom={true}
                className="h-full w-full rounded-lg"
              >
                <MapViewportController
                  destination={destination}
                  userPosition={userPosition}
                />

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routePath.length > 1 && (
                  <Polyline
                    positions={routePath}
                    pathOptions={{ color: "#22d3ee", weight: 4, opacity: 0.9 }}
                  />
                )}

                {/* Destination Marker */}
                <Marker position={destination} icon={destinationIcon}>
                  <Tooltip permanent direction="top" offset={[0, -28]}>
                    {place.title}
                  </Tooltip>
                  <Popup>{place.title}</Popup>
                </Marker>

                {/* User Marker */}
                {userPosition && (
                  <Marker position={userPosition} icon={currentLocationIcon}>
                    <Tooltip permanent direction="top" offset={[0, -28]}>
                      Current Location
                    </Tooltip>
                    <Popup>You are here</Popup>
                  </Marker>
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
