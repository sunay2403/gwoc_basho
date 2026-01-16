import plate from "../assets/plate_bowl.jpg";
import { useState } from "react";

export interface CardProps {
    image?: string | null;
    name?: string;
    price?: string | number;
    stock?: number;
    category?:{id:number,name?:string};
    productId?: number;
    onAdd?: (productId?: number) => void;
    adding?: boolean;
}

function Card({ image, name, price, stock, category, productId, onAdd, adding }: CardProps) {
    const [loaded, setLoaded] = useState(false);
    const src = image ?? plate;
    const isOutOfStock = stock !== undefined && stock <= 0;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md border border-stone-100 h-full flex flex-col">
            <div className="w-full aspect-square bg-stone-100 overflow-hidden relative">
                <img
                    src={src}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 ${isOutOfStock ? 'opacity-50' : 'group-hover:scale-110'} ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                    alt={name ?? "product"}
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-stone-800 font-serif text-lg mb-2 line-clamp-2">{name ?? "Clay Plate and Bowl"}</h3>
                {category && category.name && <div className="text-sm text-stone-500 mb-2">{category.name}</div>}
                <div className="text-amber-800 font-bold text-xl mb-3">{typeof price === 'number' ? `₹${price.toFixed(0)}` : price ?? "₹255.00"}</div>
                {stock !== undefined && (
                    <div className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </div>
                )}
            </div>

            <div className="px-6 pb-6 flex flex-col gap-2 border-t border-stone-100 pt-4">
                <button
                    onClick={() => onAdd && onAdd(productId)}
                    disabled={!onAdd || isOutOfStock || adding}
                    className="w-full px-4 py-2.5 bg-amber-800 text-white rounded-full text-sm font-semibold shadow hover:bg-amber-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {adding ? "Adding…" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}

export default Card;