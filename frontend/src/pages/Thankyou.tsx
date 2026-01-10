import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type OrderItem = {
  id: number;
  product?: {
    name: string;
  };
  name?: string;
  quantity: number;
  price: string;
};

type LocationState = {
  amount: number;
  items?: OrderItem[];
};

const ThankYou: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  useEffect(() => {
    // Prevent going back to payment page
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-stone-600 mb-6">
          Thank you for your order. Your payment has been received
          successfully.
        </p>

        {state?.amount && (
          <div className="mb-6 text-lg font-medium">
            Amount Paid: ₹{state.amount}
          </div>
        )}

        {state?.items && (
          <div className="text-left mb-6">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <ul className="space-y-1 text-sm">
              {state.items.map((it) => (
                <li
                  key={it.id}
                  className="flex justify-between"
                >
                  <span>
                    {(it.product?.name ?? it.name) || "Item"} ×{" "}
                    {it.quantity}
                  </span>
                  <span>
                    ₹{Number(it.price) * it.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full px-6 py-3 bg-amber-800 text-white rounded font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
