import { useMemo, useState, useEffect } from "react";
import Card from "../components/Card.tsx";
import type { JSX } from "react/jsx-dev-runtime";

interface Product {
    id: number;
    name: string;
    price: number;
    category?: string;
    image: { src: string };
}

interface Category{
    id:string;
    name?:string;
}

function ProductList(): JSX.Element {
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [priceLimit, setPriceLimit] = useState<number>(0);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    //Fetch from backend
    const categories: Category[] = useMemo(() => [
        { id: "1", name: "Bowl" },
        { id: "2", name: "Plate" },
        { id: "3", name: "Drinkware" },
        { id: "4", name: "Decor" },
        { id: "5", name: "Tableware" }
    ], []);

    //Fetch from backend
    const products: Product[] = useMemo(() => [
        {
            id: 1,
            name: "Tea Bowl — Rustic White",
            category: "1",
            price: 1299,
            image: { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80" },
        },
        {
            id: 2,
            name: "Serving Plate — Matte",
            category: "2",
            price: 899,
            image: { src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80" },
        },
        {
            id: 3,
            name: "Sake Set — Minimal",
            category: "3",
            price: 699,
            image: { src: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80" },
        },
        {
            id: 4,
            name: "Small Vase — Textured",
            category: "4",
            price: 499,
            image: { src: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80" },
        },
        {
            id: 5,
            name: "Serving Platter — Oval",
            category: "5",
            price: 1599,
            image: { src: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80" },
        }
    ], []);

    const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 0), [products]);

    useEffect(() => {
        setPriceLimit(maxPrice);
    }, [maxPrice]);

    const filtered = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCats.length === 0 || (p.category !== undefined && selectedCats.includes(p.category));
        const matchesPrice = p.price <= priceLimit;
        return matchesQuery && matchesCategory && matchesPrice;
    });

    return (
        <div className="flex gap-8 px-6 py-12 max-w-7xl mx-auto">
            <aside className="w-72 hidden md:block">
                <div className="p-4 bg-white rounded-lg shadow-sm sticky top-6">
                    <h4 className="font-semibold mb-3">Categories</h4>
                    <div className="flex flex-col gap-2 mb-4">
                        {categories.map(cat => (
                            <label key={cat.id} className="inline-flex items-center gap-2 text-sm text-stone-700">
                                <input
                                    type="checkbox"
                                    checked={selectedCats.includes(cat.id)}
                                    onChange={() => setSelectedCats(prev => prev.includes(cat.id) ? prev.filter(x => x !== cat.id) : [...prev, cat.id])}
                                    className="w-4 h-4"
                                />
                                <span>{cat.name}</span>
                            </label>
                        ))}
                    </div>

                    <h4 className="font-semibold mb-3">Max Price</h4>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min={0}
                            max={maxPrice}
                            value={priceLimit}
                            onChange={e => setPriceLimit(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="w-20 text-right font-bold">₹{priceLimit}</div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={() => { setSelectedCats([]); setPriceLimit(maxPrice); }}
                            className="w-full px-4 py-2 bg-[#8E5022] text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1">
                <div className="mb-12">
                    <div className="mb-6">
                        <h2 className="text-5xl font-serif font-light text-stone-800 mb-2">Our Collection</h2>
                        <p className="text-lg text-stone-600">Handcrafted pieces made with intention</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search collection..."
                            className="w-full max-w-md flex-1 px-5 py-3 rounded-full border-2 border-stone-200 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="text-stone-600 hover:underline focus:outline-none"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filtered.map((p, idx) => (
                        <div
                            key={p.id}
                            style={{ transitionDelay: `${idx * 60}ms` }}
                            className={`opacity-0 translate-y-4 ${mounted ? 'opacity-100 translate-y-0' : ''} transition-all duration-500`}
                        >
                            <Card image={p.image.src} name={p.name} price={p.price} category= {categories.find(catg=> catg.id===p.category)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;