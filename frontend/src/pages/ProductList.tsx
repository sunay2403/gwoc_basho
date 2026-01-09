import { useMemo, useState, useEffect } from "react";
import Card from "../components/Card";
import Cart from "./Cart";
import { addToCart, getCart } from "../api/cart";
import type { JSX } from "react/jsx-runtime";
import type { Category, Product} from "../api/products";
import { getProducts, getCategories } from "../api/products";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ProductList(): JSX.Element {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState<number>(0);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingIds, setAddingIds] = useState<number[]>([]);

  /* ------------------ Animation mount ------------------ */

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ------------------ Fetch cart count ------------------ */

  const loadCartCount = async () => {
    try {
      const data = await getCart();
      setCartCount((data.items || []).reduce((s: number, it: any) => s + it.quantity, 0));
    } catch (err) {
      console.error("Failed to fetch cart count", err);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  /* ------------------ Fetch backend data ------------------ */

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
            getCategories(),
            getProducts(),
        ]);

        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Failed loading products", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ------------------ Price handling ------------------ */

  const maxPrice = useMemo(
    () => Math.max(...products.map(p => Number(p.price)), 0),
    [products]
  );

  useEffect(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);

  /* ------------------ Filtering ------------------ */

  const filtered = products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCats.length === 0 || selectedCats.includes(String(p.category.id));
    const matchesPrice = Number(p.price) <= priceLimit;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  /* ------------------ Loading state ------------------ */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Loading products…
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="flex gap-8 px-6 py-12 max-w-7xl mx-auto relative">
      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-end sm:items-center justify-center"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h2 className="font-semibold text-lg">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-2xl leading-none hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <Cart />
          </div>
        </div>
      )}

      {/* -------- Sidebar -------- */}
      <aside className="w-72 hidden md:block">
        <div className="p-4 bg-white rounded-lg shadow-sm sticky top-6">
          <h4 className="font-semibold mb-3">Categories</h4>

          <div className="flex flex-col gap-2 mb-4">
            {categories.map(cat => (
              <label key={cat.id} className="inline-flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(String(cat.id))}
                  onChange={() =>
                    setSelectedCats(prev =>
                      prev.includes(String(cat.id))
                        ? prev.filter(x => x !== String(cat.id))
                        : [...prev, String(cat.id)]
                    )
                  }
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
              onClick={() => {
                setSelectedCats([]);
                setPriceLimit(maxPrice);
              }}
              className="w-full px-4 py-2 bg-[#8E5022] text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>
      </aside>

      {/* -------- Products -------- */}
      <div className="flex-1">

        {/* Header with Cart Button */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-2">
              Our Collection
            </h2>
            <p className="text-lg text-stone-600">
              Handcrafted pieces made with intention
            </p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative px-4 py-2 bg-amber-800 text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition-colors whitespace-nowrap ml-4"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </button>
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-stone-500 py-20">
            No products found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((p, idx) => {
              const img =
                p.images.find(img => img.is_primary)?.image ||
                p.images[0]?.image ||
                null;

              const imageUrl = img ? `${API_BASE}${img}` : null;

              return (
                <div
                  key={p.id}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                  className={`opacity-0 translate-y-4 ${
                    mounted ? "opacity-100 translate-y-0" : ""
                  } transition-all duration-500`}
                >
                  <Card
                    image={imageUrl}
                    name={p.name}
                    price={Number(p.price)}
                    category={{id: p.id, name : p.category.name}}
                    productId={p.id}
                    adding={addingIds.includes(p.id)}
                    onAdd={async (productId) => {
                      const id = productId || p.id;
                      setAddingIds(prev => [...prev, id]);
                      try {
                        await addToCart(id, 1);
                        await loadCartCount();
                        console.log("Added to cart", id);
                      } catch (err) {
                        console.error("Failed to add to cart", err);
                      } finally {
                        setAddingIds(prev => prev.filter(x => x !== id));
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;