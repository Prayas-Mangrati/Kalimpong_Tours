import Card from "./card";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";

export default function CardSection({ selectedType, searchPlace }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8080/places");
      const data = await response.json();
      setPlaces(data);
      setLoading(false);
    };

    fetchPlaces();
  }, []);
  const filteredPlaces = places.filter((place) => {
    const matchesType = selectedType === "all" || place.type === selectedType;

    const matchesSearch =
      place.title.toLowerCase().includes(searchPlace.toLowerCase()) ||
      place.description.toLowerCase().includes(searchPlace.toLowerCase());

    return matchesType && matchesSearch;
  });
  if (loading) {
    return <LoadingSpinner text="Loading Destinations..."/>;
  }
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlaces.map((place) => (
        <Card key={`${place._id}`} data={place} />
        
      ))}
      {filteredPlaces.length === 0 && (
        <p className="text-white text-center col-span-full">No places found</p>
      )}
    </section>
  );
}
