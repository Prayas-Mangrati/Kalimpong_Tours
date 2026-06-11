import { useToast } from "../context/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast.show) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded-xl px-5 py-3 text-white shadow-xl transition-all
      ${
        toast.type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {toast.message}
    </div>
  );
}