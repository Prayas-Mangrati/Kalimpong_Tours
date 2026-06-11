import Navbar from "./components/navbar.jsx";
import Iconbar from "./components/iconbar.jsx";
import Footer from "./components/footer.jsx";
import CardSection from "./components/cardSection.jsx";
import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import PlaceDetail from "./pages/placeDetail.jsx";
import Hero from "./components/hero.jsx";
import AiAssistant from "./components/AiAssistant.jsx";
import AddPlace from "./pages/AddPlace.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditPlace from "./pages/EditPlace.jsx";
import Toast from "./components/Toast.jsx";
function App() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchPlace, setSearchPlace] = useState("");
  const cardsRef = useRef(null);
  return (
    <>
      <Toast />
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
                <AiAssistant />
              </div>
            </>
          }
        />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/admin/add-place" element={<AddPlace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<EditPlace />} />
      </Routes>
    </>
  );
}

export default App;
