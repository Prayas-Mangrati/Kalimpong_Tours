import Navbar from "./navbar.jsx";
import Iconbar from "./iconbar.jsx";
import Footer from "./footer.jsx";
import CardSection from "./cardSection.jsx";
import { useState,useRef } from "react";
import { Routes, Route } from "react-router-dom";
import PlaceDetail from "./placeDetail";
import Hero from "./hero.jsx";
import AiAssistant from "./AiAssistant.jsx"; 
function App() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchPlace, setSearchPlace] = useState("");
  const cardsRef=useRef(null);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="min-h-screen flex flex-col">
              <Navbar
                cardsRef={cardsRef}
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
              />
              <main className="flex-grow">
                <Hero />
                
                <div ref={cardsRef}>
                  <Iconbar
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
                </div>
                <CardSection
                  
                  selectedType={selectedType}
                  searchPlace={searchPlace}
                />
              </main>
              <Footer />
              <AiAssistant/>
            </div>
          </>
        }
      />
      <Route path="/place/:id" element={<PlaceDetail />} />
    </Routes>
  );
}

export default App;
