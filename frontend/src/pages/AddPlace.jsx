import { useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function AddPlace() {
  const navigate = useNavigate();
  const cardsRef = useRef(null);
  const [searchPlace, setSearchPlace] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinateWarning, setCoordinateWarning] = useState(false);
  const [isFetchingCoordinates, setIsFetchingCoordinates] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    full_description: "",
    latitude: "",
    longitude: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.type) {
      newErrors.type = "Please select a type";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Short description is required";
    }

    if (!formData.full_description.trim()) {
      newErrors.full_description = "Full description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    }

    if (!image) {
      newErrors.image = "Please select an image";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      showToast(
        "Please fill all required fields",
        "warning",
        "triangle-exclamation",
      );
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("full_description", formData.full_description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);
    formDataToSend.append("img", image);

    const response = await fetch("http://localhost:8080/admin/add-place", {
      method: "POST",
      body: formDataToSend,
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      showToast("Place added successfully!", "success", "circle-check");
      navigate("/admin/dashboard");
      setIsSubmitting(false);
    } else {
      showToast(
        result.message || "Failed to add place",
        "error",
        "circle-xmark",
      );
      navigate("/admin/dashboard");
    }
    setIsSubmitting(false);
  };
  const handleFetchCoordinates = async () => {
    setIsFetchingCoordinates(true);
    if (!formData.title.trim()) {
      showToast(
        "Please enter a title first",
        "warning",
        "triangle-exclamation",
      );
      setIsFetchingCoordinates(false);
      return;
    }
    const response = await fetch(
      "http://localhost:8080/admin/fetch-coordinates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
        }),
      },
    );

    const result = await response.json();

    if (result.success) {
      setCoordinateWarning(false);

      setFormData((prev) => ({
        ...prev,
        latitude: result.latitude,
        longitude: result.longitude,
      }));

      showToast("Coordinates fetched successfully!", "success", "circle-check");
    } else {
      setCoordinateWarning(true);

      showToast(
        " Couldn't fetch coordinates. Please enter them manually or leave them blank.",
        "warning",
        "triangle-exclamation",
      );
    }
    setIsFetchingCoordinates(false);
  };

  return (
    <>
      <Navbar
        cardsRef={cardsRef}
        searchPlace={searchPlace}
        setSearchPlace={setSearchPlace}
      />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl border-gradient rounded-3xl shadow-2xl">
          <div className="border-gradient-inner rounded-3xl p-5 sm:p-6 lg:p-8">
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/5 bg-white/5 px-5 py-6 text-center sm:px-8 sm:py-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

              <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Add New Place
              </h2>
            </div>

            <div ref={cardsRef} className="grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-200"
                >
                  Title
                </label>

                <div className="flex gap-3 items-stretch">
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter the title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setErrors({
                        ...errors,
                        title: "",
                      });
                    }}
                    className={`flex-1 rounded-xl border ${
                      errors.title ? "border-red-500" : "border-white/10"
                    } bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30`}
                  />

                  <button
                    type="button"
                    onClick={handleFetchCoordinates}
                    disabled={isFetchingCoordinates}
                    className="rounded-xl border border-yellow-500/40 bg-yellow-500/15 px-5 py-3 text-yellow-300 transition hover:bg-yellow-500/25 hover:border-yellow-400"
                  >
                    {isFetchingCoordinates ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                        Fetching...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-location-crosshairs mr-2"></i>
                        Fetch
                      </>
                    )}
                  </button>
                </div>

                {errors.title && (
                  <p className="text-red-400 text-sm">{errors.title}</p>
                )}
              </div>

              <div className="grid gap-3">
                <label className="text-sm font-medium text-gray-200">
                  Select Type of Place
                </label>
                <div
                  className={`grid gap-3 sm:grid-cols-3 rounded-xl p-2 ${errors.type ? " border-2 border-red-500" : ""} `}
                >
                  {["Tourist Attraction", "Hotel", "Homestay"].map(
                    (placeType) => (
                      <label
                        key={placeType}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-gray-200 transition hover:border-blue-400/50 hover:bg-black/35"
                      >
                        <input
                          type="radio"
                          name="type"
                          value={placeType}
                          checked={formData.type === placeType}
                          onChange={(e) => {
                            setFormData({ ...formData, type: e.target.value });
                            setErrors({
                              ...errors,
                              type: "",
                            });
                          }}
                          className="h-4 w-4 border-gray-500 bg-transparent text-blue-500 focus:ring-blue-500"
                        />
                        <span>{placeType}</span>
                      </label>
                    ),
                  )}
                </div>
                {errors.type && (
                  <p className="text-red-400 text-sm mt-1">{errors.type}</p>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-200"
                >
                  Short Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter one line description"
                  rows="1"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setErrors({
                      ...errors,
                      description: "",
                    });
                  }}
                  className={`w-full resize-none rounded-xl border ${errors.description ? "border-red-500" : "border-white/10"} bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30`}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="full_description"
                  className="text-sm font-medium text-gray-200"
                >
                  Full Description
                </label>
                <textarea
                  id="fullDescription"
                  placeholder="Enter full description"
                  rows="5"
                  value={formData.full_description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      full_description: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      full_description: "",
                    });
                  }}
                  className={`w-full resize-none rounded-xl border ${errors.full_description ? "border-red-500" : "border-white/10"} bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30`}
                />
                {errors.full_description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.full_description}
                  </p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-200">
                    Latitude
                  </label>

                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latitude: e.target.value,
                      })
                    }
                    placeholder="Auto-filled or enter manually"
                    className={`w-full rounded-xl border ${coordinateWarning ? "border-yellow-500" : "border-white/10"} bg-black/30 px-4 py-3 text-white`}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-200">
                    Longitude
                  </label>

                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longitude: e.target.value,
                      })
                    }
                    placeholder="Auto-filled or enter manually"
                    className={`w-full rounded-xl border ${coordinateWarning ? "border-yellow-500" : "border-white/10"} bg-black/30 px-4 py-3 text-white`}
                  />
                </div>
              </div>
              {coordinateWarning && (
                <p className="text-yellow-400 text-sm flex items-center gap-2 w-full">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Couldn't fetch coordinates automatically. Enter them manually
                  or leave them blank.
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-200"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter the price"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      setErrors({
                        ...errors,
                        price: "",
                      });
                    }}
                    className={`w-full rounded-xl border ${errors.price ? "border-red-500" : "border-white/10"} bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30`}
                  />
                  {errors.price && (
                    <p className="text-red-400 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="img"
                    className="text-sm font-medium text-gray-200"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setErrors({
                        ...errors,
                        image: "",
                      });
                    }}
                    className={`w-full rounded-xl border ${errors.image ? "border-red-500" : "border-white/10"} bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-violet-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-white/25`}
                  />
                  {errors.image && (
                    <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                className={`w-[40%] lg:w-[30%] rounded-xl bg-blue-500 px-4 py-3 text-white hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
