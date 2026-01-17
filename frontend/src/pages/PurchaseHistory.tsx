import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/firebase";

interface Product {
  product_id: number;
  product_name: string;
  product_slug: string;
  product_price: number;
  total_quantity_purchased: number;
  orders: Array<{
    order_id: number;
    razorpay_order_id: string;
    quantity: number;
    price: number;
    purchase_date: string;
    order_amount: number;
  }>;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const PurchaseHistory: React.FC = () => {
  const [purchases, setPurchases] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  const loadPurchaseHistory = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const token = await user.getIdToken(true);
      const response = await fetch(`${API_BASE}/api/payments/purchase-history/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load purchase history");
      }

      const data = await response.json();
      setPurchases(data.results || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load purchase history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">Loading your purchase history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-light text-stone-800 mb-2">
            Purchase History
          </h1>
          <p className="text-lg text-stone-600">
            View all the beautiful pieces you've purchased from us
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium text-red-900">{error}</p>
          </div>
        )}

        {purchases.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <svg
              className="w-24 h-24 mx-auto mb-6 text-stone-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-stone-800 mb-2">
              No purchases yet
            </h3>
            <p className="text-stone-600 mb-6">
              Start exploring our collection to make your first purchase
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-amber-800 text-white rounded-full font-semibold hover:bg-amber-900 transition-all hover:shadow-lg"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((product) => (
              <div
                key={product.product_id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Product Header */}
                <div className="p-6 border-b border-stone-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-stone-800 mb-2">
                        {product.product_name}
                      </h3>
                      <p className="text-amber-800 font-bold text-lg mb-3">
                        ₹{product.product_price.toFixed(2)}
                      </p>
                      <div className="inline-block px-4 py-2 bg-green-50 rounded-full">
                        <p className="text-green-700 font-medium text-sm">
                          Total purchased: {product.total_quantity_purchased} unit
                          {product.total_quantity_purchased !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orders Timeline */}
                <div className="p-6">
                  <h4 className="font-semibold text-stone-800 mb-4 text-sm uppercase tracking-wide">
                    Order Details
                  </h4>
                  <div className="space-y-4">
                    {product.orders.map((order, index) => (
                      <div
                        key={order.order_id}
                        className={`p-4 rounded-lg ${
                          index % 2 === 0 ? "bg-amber-50" : "bg-stone-50"
                        } border border-stone-200`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <p className="text-sm text-stone-600 mb-2">
                              <span className="font-semibold">Order ID:</span>{" "}
                              {order.razorpay_order_id}
                            </p>
                            <p className="text-sm text-stone-600 mb-2">
                              <span className="font-semibold">Date:</span>{" "}
                              {new Date(order.purchase_date).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-stone-600 mb-2">
                              <span className="font-semibold">Qty:</span>{" "}
                              {order.quantity}
                            </p>
                            <p className="text-lg font-bold text-amber-900">
                              ₹{order.order_amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide text-amber-700 font-semibold mb-2">
                  Total Products Purchased
                </p>
                <p className="text-4xl font-bold text-amber-900 mb-4">
                  {purchases.length}
                </p>
                <p className="text-amber-700">
                  Thank you for supporting handcrafted excellence!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-amber-800 hover:text-amber-900 font-semibold transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;