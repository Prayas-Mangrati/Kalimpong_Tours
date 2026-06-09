import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function EditPlace() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    full_description: "",
    price: "",
  });

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await fetch(`http://localhost:8080/admin/place/${id}`);

      const data = await response.json();

      setFormData({
        title: data.title,
        type: data.type,
        description: data.description,
        full_description: data.full_description,
        price: data.price,
      });
    };

    fetchPlace();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch(
      `http://localhost:8080/admin/edit-place/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    const result = await response.json();
    if (result.success) {
      setIsSubmitting(false);
      alert("Place updated successfully");
    } else {
      setIsSubmitting(false);
      alert("Failed to update place");
    }
  };

  return (
    <>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl border-gradient rounded-3xl shadow-2xl">
          <div className="border-gradient-inner rounded-3xl p-5 sm:p-6 lg:p-8">
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/5 bg-white/5 px-5 py-6 text-center sm:px-8 sm:py-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

              <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Edit Place
              </h2>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-200"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter the title"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <label className="text-sm font-medium text-gray-200">
                  Select Type of Place
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
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
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="h-4 w-4 border-gray-500 bg-transparent text-blue-500 focus:ring-blue-500"
                        />
                        <span>{placeType}</span>
                      </label>
                    ),
                  )}
                </div>
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
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="fullDescription"
                  className="text-sm font-medium text-gray-200"
                >
                  Full Description
                </label>
                <textarea
                  id="fullDescription"
                  placeholder="Enter full description"
                  rows="5"
                  value={formData.full_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      full_description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

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
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
                  />
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
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full rounded-xl border border-dashed border-white/15 bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-violet-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-white/25"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                className={`w-[40%] lg:w-[30%] rounded-xl bg-blue-500 px-4 py-3 text-white hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
