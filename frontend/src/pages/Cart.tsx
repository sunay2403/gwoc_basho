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
    try {
      await updateCartItem(itemId, qty);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (itemId: number) => {
    try {
      await removeCartItem(itemId);
      await load();
    } catch (err) {
      console.error(err);
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


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">
                    {it.product.name}
                  </div>
                  <div className="text-sm text-stone-600">
                    ₹{it.price}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      changeQty(it.id, it.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{it.quantity}</span>
                  <button
                    onClick={() =>
                      changeQty(it.id, it.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="font-semibold">
              Subtotal: ₹{subtotal.toFixed(2)}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
