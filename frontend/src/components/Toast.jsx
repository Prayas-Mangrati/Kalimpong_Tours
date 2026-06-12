import { useToast } from "../context/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast.show) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 slide-down shadow-[0_0_25px_rgba(59,130,246,0.35)]">
      <div className="border-gradient rounded-2xl shadow-2xl">
        <div className="border-gradient-inner flex items-center gap-3 rounded-2xl px-5 py-4 backdrop-blur-xl bg-black/40">
          <div className="text-2xl">
            {toast.type === "success" ? (
              <i className="fa-solid fa-circle-check text-green-400 text-xl"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark text-red-400 text-xl"></i>
            )}
          </div>

          <div>

            <p className="text-sm text-gray-300">{toast.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
