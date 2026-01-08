import plate from "../assets/plate_bowl.jpg";
import { useState } from "react";

export interface CardProps {
    image?: string | null;
    name?: string;
    price?: string | number;
    category?:{id:number,name?:string};
}

function Card({ image, name, price, category}: CardProps) {
    const [loaded, setLoaded] = useState(false);
    const src = image ?? plate;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md border border-stone-100 h-full flex flex-col">
            <div className="w-full aspect-square bg-stone-100 overflow-hidden relative">
                <img
                    src={src}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                    alt={name ?? "product"}
                />
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-stone-800 font-serif text-lg mb-2 line-clamp-2">{name ?? "Clay Plate and Bowl"}</h3>
                {category && category.name && <div className="text-sm text-stone-500 mb-2">{category.name}</div>}
                <div className="text-amber-800 font-bold text-xl mb-3">{typeof price === 'number' ? `₹${price.toFixed(0)}` : price ?? "₹255.00"}</div>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-2 border-t border-stone-100 pt-4">
                <button className="w-full px-4 py-2.5 bg-amber-800 text-white rounded-full text-sm font-semibold shadow hover:bg-amber-900 transition-colors">Add to Cart</button>
            </div>
        </div>
    );
}

export default Card;