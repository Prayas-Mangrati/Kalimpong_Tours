import { useNavigate } from "react-router-dom";
export default function Card({data}) {
    const navigate = useNavigate();
    return (
        <article style={{ cursor: "pointer" }} className="border-gradient rounded-lg h-full cardstyle" onClick={() => navigate(`/place/${data._id}`)}>
            <div className="border-gradient-inner rounded-lg overflow-hidden shadow-lg h-full p-0">
                <img className="w-full h-40 sm:h-44 object-cover" src={data.img.url} alt={data.title} />
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{data.title}</h3>    
                    <p className="text-gray-400 text-base">{data.description}</p>
                </div>
            </div>
        </article>  
    );
}