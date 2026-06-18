export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <i className="fa-solid fa-compass fa-spin text-5xl text-blue-500 brand-text-glow"></i>

      <p className="mt-4 text-lg text-white brand-text-glow">
        {text}
      </p>
    </div>
  );
}