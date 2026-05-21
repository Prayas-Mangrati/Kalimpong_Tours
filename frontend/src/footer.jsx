export default function Footer() {
  return (
    <div className="border-gradient mt-10">
      <div className="flex justify-center items-center p-4 gap-6 rounded-t-lg border-gradient-inner flex-col">
        {/* LOGO */}
        <div className="text-white text-xl flex items-center gap-2">
          <img className="logo brand-text-glow" src="/kpg_tour_logo.png" />
          <a href="#" className="brand-text-glow p-1">
            Kalimpong Tours
          </a>
        </div>

        {/* MAIN SECTIONS */}
        <div className="flex flex-col md:flex-row py-8 gap-8 md:gap-20 text-center md:text-left">
          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col mt-3 gap-1">
              <a href="#">Home</a>
              <a href="#">Hotels</a>
              <a href="#">Homestays</a>
              <a href="#">Tourist Spots</a>
              <a href="#">Plan Your Trip</a>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold">Social Links</h3>
            <div className="flex flex-col mt-3 gap-1">
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold">Contact Info</h3>
            <div className="flex flex-col mt-3 gap-1">
              <a href="#">Email: support@kalimpong.com</a>
              <a href="#">Location: Kalimpong, West Bengal</a>
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="text-white text-sm text-center px-4">
          © 2026 Kalimpong Tours. All rights reserved | Built with ❤️ for
          travelers exploring Kalimpong.
        </div>
      </div>
    </div>
  );
}
