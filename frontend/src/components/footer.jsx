export default function Footer() {
  return (
    <div className="border-gradient mt-10">
      <div className="flex justify-center items-center p-4 gap-6 rounded-t-lg border-gradient-inner flex-col">
        <div className="text-white text-xl flex items-center gap-2">
          <img className="logo brand-text-glow" src="/kpg_tour_logo.png" />
          <a href="#" className="brand-text-glow p-1">
            Kalimpong Tours
          </a>
        </div>
        <div className="flex flex-col md:flex-row py-8 gap-8 md:gap-20 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-center">Quick Links</h3>
            <div className="flex flex-col mt-3 gap-1 text-center">
              <a href="#">Home</a>
              <a href="#">Hotels</a>
              <a href="#">Homestays</a>
              <a href="#">Tourist Spots</a>
              <a href="/admin/login" className="icon-active">Login as Admin</a>
              <a href="/about" className="icon-active">About Us</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-center">Social Links</h3>
            <div className="flex flex-col mt-3 gap-1 justify-center items-center">
              <a href="https://www.linkedin.com/in/prayas-mangrati">LinkedIn</a>
              <a href="https://www.instagram.com/prayas_mangrati">Instagram</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-center">Contact Info</h3>
            <div className="flex flex-col mt-3 gap-1">
              <a href="#">Email: prayasmangrati4515@gmail.com</a>
              <a href="#">Location: Kalimpong, West Bengal</a>
            </div>
          </div>
        </div>
        <div className="text-white text-sm text-center px-4">
          © 2026 Kalimpong Tours. All rights reserved | Built with ❤️ for
          travelers exploring Kalimpong.
        </div>
      </div>
    </div>
  );
}
