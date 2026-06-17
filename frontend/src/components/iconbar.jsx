export default function iconbar({ selectedType, setSelectedType }) {
  const toggleType = (type) => {
    setSelectedType((prev) => (prev === type ? "all" : type));
  };

  return (
    <div className="outer-iconbar">
      <div className="border-gradient m-iconbar">
        <div className="inner-iconbar flex  items-center gap-4 rounded-lg border-gradient-inner">
          <div
            onClick={() => toggleType("all")}
            className={`text-white icon-gradient-hover ${selectedType === "all" ? "icon-active" : ""}`}
            style={{ cursor: "pointer" }} 
          >
            <i className="fa-solid fa-map  block text-xl"></i>
            <span className="text-sm">All</span>
          </div>
          <div
            onClick={() => toggleType("tourist")}
            className={`text-white icon-gradient-hover ${selectedType === "tourist" ? "icon-active" : ""}`}
            style={{ cursor: "pointer" }} 
          >
            <i className="fa-solid fa-compass block text-xl "></i>
            <span className="text-sm">Tourist <span className="hidden sm:inline">Spots</span></span>
          </div>
          <div
            onClick={() => toggleType("homestay")}
            className={`text-white icon-gradient-hover ${selectedType === "homestay" ? "icon-active" : ""}`}
            style={{ cursor: "pointer" }} 
          >
            <i className="fa-solid fa-house block text-xl"></i>
            <span>Homestays</span>
          </div>
          <div
            onClick={() => toggleType("hotel")}
            className={`text-white icon-gradient-hover flex-col ${selectedType === "hotel" ? "icon-active" : ""}`}
            style={{ cursor: "pointer" }} 
          >
            <i className="fa-solid fa-hotel block text-xl"></i>
            <span>Hotels</span>
          </div>
        </div>
      </div>
    </div>
  );
}
