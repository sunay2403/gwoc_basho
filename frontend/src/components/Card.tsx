import plate from "../assets/plate_bowl.jpg";
import { useState } from "react";

export interface CardProps {
    image?: string;
    name?: string;
    price?: string | number;
    description?: string;
}

function Card({ image, name, price, description }: CardProps) {
    const [loaded, setLoaded] = useState(false);
    const src = image ?? plate;

    return (
        <div className="group relative bg-[#EDD8B4]/5 h-100 p-2 font-[Montserrat] hover:bg-[#EDD8B4]/20 overflow-hidden rounded-xl transition-transform duration-500 transform hover:scale-105 shadow-lg">
            <div className="w-full aspect-square bg-stone-100 overflow-hidden rounded-lg">
                <img
                    src={src}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                    alt={name ?? "product"}
                />
            </div>

            <div className="p-3">
                <div className="text-stone-800 font-medium text-lg mb-1">{name ?? "Clay Plate and Bowl"}</div>
                <div className="text-amber-800 font-semibold">{typeof price === 'number' ? `₹${price.toFixed(2)}` : price ?? "₹255.00"}</div>
                <div className="text-stone-600 text-sm mt-2 line-clamp-3">{description ?? "A very nice item to have. Small imperfections make each piece unique."}</div>
            </div>

            <div className="absolute inset-x-3 bottom-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button className="px-4 py-2 bg-amber-800 text-white rounded-full text-sm shadow">Add to cart</button>
                <button className="px-3 py-2 border border-stone-300 text-stone-700 rounded-full text-sm bg-white/60">Quick view</button>
            </div>
        </div>
    );
}

export default Card;