import plate from "../assets/plate_bowl.jpg";

function Card(){
    return (
        <div className="bg-[#EDD8B4]/5 h-100 p-2 font-[Montserrat] hover:bg-[#EDD8B4]/20 overflow-clip">
            <img src={plate} className="w-full aspect-square" />
            Clay Plate and Bowl<br />
            <b>₹255.00</b><br />
            <i>&nbsp;A very nice item to have. You should buy it even if you don't want to right now we are checking the text limit</i>
        </div>
    );
}

export default Card;