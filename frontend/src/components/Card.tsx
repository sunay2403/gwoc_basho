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
                <div className="text-amber-800 font-bold text-xl mb-3">{typeof price === 'number' ? `₹${price.toFixed(0)}` : price ?? "₹255.00"}</div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{description ?? "A very nice item to have. Small imperfections make each piece unique."}</p>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-2 border-t border-stone-100 pt-4">
                <button className="w-full px-4 py-2.5 bg-amber-800 text-white rounded-full text-sm font-semibold shadow hover:bg-amber-900 transition-colors">Add to Cart</button>
                <button className="w-full px-4 py-2.5 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-semibold hover:bg-stone-50 transition-colors">Quick View</button>
            </div>
        </div>
    );
}

export default Card;