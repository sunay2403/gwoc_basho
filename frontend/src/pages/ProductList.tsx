import { useMemo, useState, useEffect } from "react";
import Filter from "../components/Filter.tsx";
import Card from "../components/Card.tsx";
import type { JSX } from "react/jsx-dev-runtime";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
}

function ProductList(): JSX.Element {
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    const products: Product[] = useMemo(() => [
        {
            id: 1,
            name: "Tea Bowl — Rustic White",
            price: 1299,
            image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
            description: "Hand-thrown tea bowl with subtle glaze variations."
        },
        {
            id: 2,
            name: "Serving Plate — Matte",
            price: 899,
            image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
            description: "Wide plate for sharing, with a soft matte finish."
        },
        {
            id: 3,
            name: "Sake Set — Minimal",
            price: 699,
            image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
            description: "Pouring jug and two cups — simple and elegant."
        },
        {
            id: 4,
            name: "Small Vase — Textured",
            price: 499,
            image: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
            description: "Sculptural vase with tactile surface."
        },
        {
            id: 5,
            name: "Serving Platter — Oval",
            price: 1599,
            image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80",
            description: "Large platter for family-style meals."
        }
    ], []);

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex gap-6 px-4 py-8 max-w-7xl mx-auto">
            <aside className="w-72 hidden md:block">
                <Filter />
            </aside>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-serif text-stone-800">Collection</h2>
                    <div className="flex items-center gap-3">
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="px-4 py-2 rounded-full border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((p, idx) => (
                        <div
                            key={p.id}
                            style={{ transitionDelay: `${idx * 60}ms` }}
                            className={`opacity-0 translate-y-4 ${mounted ? 'opacity-100 translate-y-0' : ''} transition-all duration-500`}
                        >
                            <Card image={p.image} name={p.name} price={p.price} description={p.description} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;