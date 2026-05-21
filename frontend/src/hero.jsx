import { useState, useEffect } from "react";

const heroImg = [
  "https://i.ytimg.com/vi/N3vPLujGNac/hqdefault.jpg",
  "https://nomadicweekends.com/blog/wp-content/uploads/2019/03/Kalimpong.jpg",
  "https://backpackersunited.in/_next/image?url=https%3A%2F%2Fbpu-images-v1.s3.eu-north-1.amazonaws.com%2Fuploads%2F1721902468564_Kalimpong%20CV%20.jpg&w=1920&q=75",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImg.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-gradient m-4 sm:m-6 lg:m-8 rounded-2xl">
      <div className="border-gradient-inner rounded-2xl p-3 sm:p-4">
        <section className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="hero w-full rounded-2xl overflow-hidden md:flex-[1.7] md:min-w-0">
            <img
              src={heroImg[currentImage]}
              alt="Travel destination"
              className="hero-image"
            />
          </div>

          <div className="flex flex-colw-full items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-6 text-center md:flex-[1] md:min-w-0 md:text-left">
                <h1 className="wlcm-msg icon-gradient-hover m-0 p-0 text-lg sm:text-2xl lg:text-3xl">
                Welcome To Kalimpong Tours
                </h1>
                <p>A quiet hill station where nature slows you down and beauty surrounds you, where the hills whisper peace and the clouds feel closer..</p>
          </div>
        </section>
      </div>
    </div>
  );
}
