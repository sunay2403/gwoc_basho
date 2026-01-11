import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cart";

type CartItem = {
  id: number;
  product: any;
  quantity: number;
  price: string;
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeQty = async (itemId: number, qty: number) => {
    if (qty < 1) return;
    setUpdatingIds(prev => [...prev, itemId]);
    try {
      await updateCartItem(itemId, qty);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== itemId));
    }
  };

  const remove = async (itemId: number) => {
    setUpdatingIds(prev => [...prev, itemId]);
    try {
      await removeCartItem(itemId);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
      setItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = items.reduce(
    (acc, it) => acc + Number(it.price) * it.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) return;

    navigate("/confirm-order", {
      state: {
        items,
        subtotal,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-800 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-600 font-medium">Loading your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-stone-800 mb-2">Your cart is empty</h3>
        <p className="text-stone-600 mb-6">Add some beautiful handcrafted pieces to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {items.map((it) => {
            const isUpdating = updatingIds.includes(it.id);
            const itemTotal = Number(it.price) * it.quantity;
            
            return (
              <div
                key={it.id}
                className={`bg-stone-50 rounded-xl p-4 transition-all ${
                  isUpdating ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div className="flex gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 bg-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 mb-1 truncate">
                      {it.product.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-sm text-stone-600">₹{it.price}</span>
                      <span className="text-xs text-stone-500">× {it.quantity}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center bg-white rounded-lg border border-stone-200 shadow-sm">
                        <button
                          onClick={() => changeQty(it.id, it.quantity - 1)}
                          disabled={isUpdating || it.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <div className="w-12 h-8 flex items-center justify-center text-sm font-semibold text-stone-900 border-x border-stone-200">
                          {it.quantity}
                        </div>
                        <button
                          onClick={() => changeQty(it.id, it.quantity + 1)}
                          disabled={isUpdating}
                          className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => remove(it.id)}
                        disabled={isUpdating}
                        className="text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-3 pt-3 border-t border-stone-200 flex justify-end">
                  <span className="text-sm font-semibold text-stone-900">
                    Item Total: ₹{itemTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary - Fixed at Bottom */}
      <div className="border-t border-stone-200 bg-white px-6 py-5 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-stone-700">Subtotal</span>
          <span className="font-bold text-2xl text-amber-900">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Item Count */}
        <div className="text-sm text-stone-600 text-center">
          {items.reduce((sum, it) => sum + it.quantity, 0)}{" "}
          {items.reduce((sum, it) => sum + it.quantity, 0) === 1 ? "item" : "items"} in cart

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCheckout}
            className="w-full px-6 py-4 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-900 transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Proceed to Checkout
          </button>

          <button
            onClick={handleClear}
            className="w-full px-6 py-3 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        </div>

        {/* Trust Badge */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center justify-center gap-2 text-xs text-stone-600">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;