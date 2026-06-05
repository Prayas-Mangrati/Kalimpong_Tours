export default function AdminPlaceCard({ data, onDelete }) {
  return (
    <>
      <div className="border-gradient  rounded-lg cardstyle">
        <div className="border-gradient-inner flex rounded-lg items-center">
          <div className="w-16 h-16 border-2 border-white mr-4 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={data.img.url}
              alt={data.title}
            />
          </div>
          <div className="text-lg font-semibold mr-8">{data.title}</div>
          <div className="flex flex-1 gap-4 justify-end ">
            <i className="fa-solid fa-pen-to-square brand-text-glow"></i>
            <i
              className="fa-solid fa-trash brand-text-glow"
              onClick={() => onDelete(data._id)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
