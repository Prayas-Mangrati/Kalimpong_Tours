import Navbar from "./navbar.jsx";
import Iconbar from "./iconbar.jsx";
import Footer from "./footer.jsx";
import CardSection from "./cardSection.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PlaceDetail from "./placeDetail";
import Hero from "./hero.jsx";

function App() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchPlace, setSearchPlace] = useState("");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="min-h-screen flex flex-col">
              <Navbar
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
              />
              <main className="flex-grow">
                <Hero />
                <Iconbar
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
                <CardSection
                  selectedType={selectedType}
                  searchPlace={searchPlace}
                />
              </main>
              <Footer />
            </div>
          </>
        }
      />
      <Route path="/place/:id" element={<PlaceDetail />} />
    </Routes>
  );
}

export default App;
