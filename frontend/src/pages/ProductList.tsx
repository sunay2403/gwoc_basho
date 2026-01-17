import { useMemo, useState, useEffect } from "react";
import Card from "../components/Card";
import Cart from "./Cart";
import { addToCart, getCart } from "../api/cart";
import type { JSX } from "react/jsx-runtime";
import type { Category, Product} from "../api/products";
import { getProducts, getCategories } from "../api/products";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ProductList(): JSX.Element {
  const navigate = useNavigate();

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

  /* ------------------ Animation mount ---------------- */

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">Loading collection...</p>
        </div>
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center transition-opacity duration-300"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-[90vh] transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-white sticky top-0 z-10">
              <h2 className="font-semibold text-xl text-stone-800">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600 hover:text-stone-900"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Cart />
          </div>
        </div>
      )}

      <div className="flex gap-8 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-[1600px] mx-auto">
        {/* -------- Sidebar -------- */}
        <aside className="w-80 hidden lg:block flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {/* Filters Header */}
              <div className="px-6 py-5 bg-gradient-to-br from-stone-50 to-white border-b border-stone-200">
                <h3 className="text-lg font-semibold text-stone-800">Filters</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-stone-800 mb-4 text-sm uppercase tracking-wide">Categories</h4>
                  <div className="flex flex-col gap-2.5">
                    {categories.map(cat => (
                      <label key={cat.id} className="group flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-stone-50 transition-colors">
                        <div className="relative">
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
                            className="w-5 h-5 rounded border-2 border-stone-300 text-amber-800 focus:ring-2 focus:ring-amber-200 focus:ring-offset-0 cursor-pointer"
                          />
                        </div>
                        <span className="text-stone-700 group-hover:text-stone-900 font-medium text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-4 text-sm uppercase tracking-wide">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceLimit}
                      onChange={e => setPriceLimit(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
                      style={{
                        background: `linear-gradient(to right, rgb(146 64 14) 0%, rgb(146 64 14) ${(priceLimit / maxPrice) * 100}%, rgb(231 229 228) ${(priceLimit / maxPrice) * 100}%, rgb(231 229 228) 100%)`
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">₹0</span>
                      <div className="px-4 py-2 bg-stone-100 rounded-lg">
                        <span className="font-bold text-amber-900">₹{priceLimit}</span>
                      </div>
                      <span className="text-sm text-stone-600">₹{maxPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCats([]);
                    setPriceLimit(maxPrice);
                  }}
                  className="w-full px-4 py-3 bg-[#8E5022] text-white rounded-xl text-sm font-semibold hover:bg-amber-900 transition-all hover:shadow-md active:scale-[0.98]"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* -------- Products -------- */}
        <div className="flex-1 min-w-0">
          {/* Header with Cart Button */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-stone-800 mb-3 leading-tight">
                  Our Collection
                </h1>
                <p className="text-lg sm:text-xl text-stone-600">
                  Handcrafted pieces made with intention
                </p>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
  {/* Custom Order */}
  <button
    onClick={() =>
      navigate("/custom-order")
    }
    className="px-6 py-3 bg-white border-2 border-amber-800 text-amber-800 rounded-full font-semibold hover:bg-amber-50 transition-all hover:shadow-sm active:scale-95"
  >
    Custom Order
  </button>

  {/* Cart */}
  <button
    onClick={() => setShowCart(true)}
    className="relative px-6 py-3 bg-amber-800 text-white rounded-full font-semibold hover:bg-amber-900 transition-all hover:shadow-lg active:scale-95 flex items-center gap-2 group"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>

    <span>Cart</span>

    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
        {cartCount}
      </span>
    )}
  </button>
</div>

            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 max-w-2xl mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search collection..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-stone-200 bg-white shadow-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                />
              </div>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="px-5 py-4 text-stone-600 hover:text-stone-900 font-medium hover:bg-stone-100 rounded-2xl transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(selectedCats.length > 0 || priceLimit < maxPrice) && (
              <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-sm text-stone-600 font-medium">Active filters:</span>
                {selectedCats.map(catId => {
                  const cat = categories.find(c => String(c.id) === catId);
                  return cat ? (
                    <span key={catId} className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium">
                      {cat.name}
                      <button
                        onClick={() => setSelectedCats(prev => prev.filter(x => x !== catId))}
                        className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ) : null;
                })}
                {priceLimit < maxPrice && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium">
                    Up to ₹{priceLimit}
                    <button
                      onClick={() => setPriceLimit(maxPrice)}
                      className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results Count */}
            <p className="text-stone-600">
              <span className="font-semibold text-stone-800">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 mx-auto mb-6 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-semibold text-stone-800 mb-2">No products found</h3>
                <p className="text-stone-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedCats([]);
                    setPriceLimit(maxPrice);
                  }}
                  className="px-6 py-3 bg-amber-800 text-white rounded-full font-semibold hover:bg-amber-900 transition-all hover:shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-8">
              {filtered.map((p, idx) => {
                const img =
                  p.images.find(img => img.is_primary)?.image ||
                  p.images[0]?.image ||
                  null;

                const imageUrl = img ? `${API_BASE}${img}` : null;

                return (
                  <div
                    key={p.id}
                    style={{ transitionDelay: `${idx * 40}ms` }}
                    className={`opacity-0 translate-y-8 ${
                      mounted ? "opacity-100 translate-y-0" : ""
                    } transition-all duration-500 ease-out`}
                  >
                    <Card
                      image={imageUrl}
                      name={p.name}
                      price={Number(p.price)}
                      stock={p.stock}
                      category={{id: p.id, name : p.category.name}}
                      productId={p.id}
                      adding={addingIds.includes(p.id)}
                      onAdd={async (productId) => {
                        const id = productId || p.id;
                        setAddingIds(prev => [...prev, id]);
                        try {
                          await addToCart(id, 1);
                          await loadCartCount();

                          setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, stock: Math.max(0,prod.stock - 1) } : prod));

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
    </div>
  );
}

export default ProductList;