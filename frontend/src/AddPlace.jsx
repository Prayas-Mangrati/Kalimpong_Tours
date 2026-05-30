import { useRef, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
export default function AddPlace() {
  const cardsRef = useRef(null);
  const [searchPlace, setSearchPlace] = useState("");

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
                <input
                  type="text"
                  id="title"
                  placeholder="Enter the title"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
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
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter the description"
                  rows="5"
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
                    className="w-full rounded-xl border border-dashed border-white/15 bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-violet-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-white/25"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
