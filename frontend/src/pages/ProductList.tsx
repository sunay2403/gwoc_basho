import { useMemo, useState, useEffect } from "react";
import Filter from "../components/Filter.tsx";
import Card from "../components/Card.tsx";
import type { JSX } from "react/jsx-dev-runtime";
import pottery1 from "../assets/pottery_1.png";
import pottery2 from "../assets/pottery_2.png";
import pottery3 from "../assets/pottery_3.png";
import plate from "../assets/plate.png";
import plateBowl from "../assets/plate_bowl.jpg";

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
            image: plate,
            description: "Hand-thrown tea bowl with subtle glaze variations."
        },
        {
            id: 2,
            name: "Serving Plate — Matte",
            price: 899,
            image: pottery1,
            description: "Wide plate for sharing, with a soft matte finish."
        },
        {
            id: 3,
            name: "Sake Set — Minimal",
            price: 699,
            image: pottery2,
            description: "Pouring jug and two cups — simple and elegant."
        },
        {
            id: 4,
            name: "Small Vase — Textured",
            price: 499,
            image: pottery3,
            description: "Sculptural vase with tactile surface."
        },
        {
            id: 5,
            name: "Serving Platter — Oval",
            price: 1599,
            image: plateBowl,
            description: "Large platter for family-style meals."
        }
    ], []);

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex gap-8 px-6 py-12 max-w-7xl mx-auto">
            <aside className="w-72 hidden md:block">
                <Filter />
            </aside>

            <div className="flex-1">
                <div className="mb-12">
                    <div className="mb-6">
                        <h2 className="text-5xl font-serif font-light text-stone-800 mb-2">Our Collection</h2>
                        <p className="text-lg text-stone-600">Handcrafted pieces made with intention</p>
                    </div>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search collection..."
                        className="w-full max-w-md px-5 py-3 rounded-full border-2 border-stone-200 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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