import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

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
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-amber-800" />
          </div>
          <h1 className="text-3xl font-serif font-light text-stone-800 mb-2">
            Payment Successful
          </h1>
          <p className="text-stone-600">
            Thank you for your order. We’ve received your payment.
          </p>
        </div>

        {/* Order Amount */}
        {state?.amount && (
          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 mb-8">
            <div className="flex items-center gap-3 text-stone-700">
              <IndianRupee className="w-5 h-5 text-amber-800" />
              <span className="font-medium">Amount Paid</span>
            </div>
            <span className="text-xl font-semibold text-stone-800">
              ₹{state.amount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Order Summary */}
        {state?.items && (
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-medium text-stone-800 mb-4">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              Order Details
            </h2>

            <div className="space-y-3">
              {state.items.map((it) => (
                <div
                  key={it.id}
                  className="flex justify-between items-start border-b border-stone-100 pb-3"
                >
                  <div>
                    <p className="font-medium text-stone-800">
                      {it.product?.name ?? it.name ?? "Item"}
                    </p>
                    <p className="text-sm text-stone-500">
                      Quantity: {it.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-stone-700">
                    ₹{Number(it.price) * it.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-500 mb-6">
            You will receive a confirmation message shortly with
            further details about your order.
          </p>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
