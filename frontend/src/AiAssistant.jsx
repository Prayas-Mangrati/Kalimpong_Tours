import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useRef, useEffect } from "react";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const lottieRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[70] cursor-pointer flex h-[155px] w-[155px] items-center justify-center sm:bottom-5 sm:right-5 sm:h-[175px] sm:w-[175px] group fixed"
      >
        <div className="absolute bottom-32 right-24 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
          <div className="bg-[#111827] text-white text-sm px-4 py-2 rounded-2xl border border-cyan-400/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] whitespace-nowrap">
            <p>Hi, I'm KAI👋</p>
            <p>Need Help?</p>
          </div>
        </div>
        <DotLottieReact
          src="/assets/robot.lottie"
          className={`h-full w-full transition-all duration-300 hover:scale-110
hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.9)] ${(isOpen)? 'drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-110':''}`}
          dotLottieRefCallback={(instance) => {
            lottieRef.current = instance;
          }}
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[40] flex items-end justify-end bg-black/40 backdrop-blur-sm">
          <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-36 w-[92vw] sm:w-[380px] h-[72vh] sm:h-[75vh] bg-[#111827] rounded-3xl border border-white/10 shadow-2xl z-[60] border-gradient flex flex-col">
            <div className="w-full h-full rounded-3xl border-gradient-inner !p-0 flex flex-col overflow-hidden">
              <section className="w-full bg-gray-800 px-4 py-4 flex justify-between items-center shrink-0">
                <img
                  src="/kai_face.jpeg"
                  alt="K-AI"
                  className="w-10 h-10 rounded-full mr-2 object-cover white-shadow"
                />
                <div className="flex flex-col items-center">
                  <h2>K-AI</h2>
                  <p className="text-gray-400 text-sm">(Kalimpong AI)</p>
                </div>
                <i
                  onClick={() => setIsOpen(false)}
                  className="fa-regular fa-circle-xmark fa-xl cursor-pointer"
                  style={{ color: "rgb(156, 31, 31)" }}
                ></i>
              </section>
              <section className="flex-1 w-full overflow-y-auto p-4">
                <div className="w-full overflow-y-auto px-4 py-6 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-2xl font-bold white-shadow">
                    Hi, I'm KAI
                  </h2>

                  <p className="text-gray-300 mt-2 text-sm max-w-[280px]">
                    Your smart Kalimpong travel companion. Ask me about places,
                    hotels, weather, travel plans and more.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    <button className="px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 hover:hover:bg-emerald-500/25 transition-all duration-300 hover:scale-105 text-sm">
                      Plan a 3-day trip
                    </button>

                    <button className="px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 hover:hover:bg-emerald-500/25 transition-all duration-300 hover:scale-105 text-sm">
                      Best viewpoints
                    </button>

                    <button className="px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 hover:hover:bg-emerald-500/25 transition-all duration-300 hover:scale-105 text-sm">
                      Budget homestays
                    </button>
                  </div>
                </div>
              </section>
              <section className="w-full bg-gray-800 px-4 py-4 shrink-0">
                <div className="flex w-full items-center gap-3">
                  <i
                    className="fa-solid fa-fan fa-lg shrink-0"
                    style={{ color: "rgb(45, 235, 235)" }}
                  ></i>
                  <input
                    type="text"
                    placeholder=" Ask KAI..."
                    className="min-w-0 flex-1 rounded-md bg-gray-600 px-3 py-2 text-white placeholder:text-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i
                    className="fa-solid fa-paper-plane cursor-pointer shrink-0"
                    style={{ color: "rgb(28, 232, 14)" }}
                  ></i>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
