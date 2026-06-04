export default function AdminPlaceCard({data}){
    return(
        <>
            <div className="border-gradient">
                <div className="border-gradient-inner flex flex row">
                    <img src={data.img} alt={data.title}/>
                    <div>{data.title}</div>
                    <div>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
