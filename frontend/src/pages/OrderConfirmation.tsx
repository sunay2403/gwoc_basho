import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  MapPin,
  Phone,
  FileText,
  CreditCard,
  CheckCircle,
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
  items: OrderItem[];
  subtotal: number;
};

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({ address: false, phone: false });

  if (!state || !state.items || state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-600">
        Invalid order
      </div>
    );
  }

  const { items, subtotal } = state;

  const proceedToPayment = () => {
    const newErrors = {
      address: !address.trim(),
      phone: !phone.trim(),
    };

    setErrors(newErrors);

    if (newErrors.address || newErrors.phone) return;

    navigate("/payment", {
      state: {
        amount: Math.round(subtotal),
        description: "Order Checkout",
        items,
        address,
        phone,
        notes,
        user: {
          name: "Guest User",
          email: "guest@email.com",
          phone,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-amber-800" />
          </div>
          <h1 className="text-3xl font-serif font-light text-stone-800 mb-2">
            Confirm Your Order
          </h1>
          <p className="text-stone-600">
            Review your items and delivery details
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Delivery Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-lg font-medium text-stone-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-800" />
                Delivery Information
              </h2>

              <div className="space-y-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full rounded-xl p-3 border ${
                      errors.address
                        ? "border-red-500"
                        : "border-stone-300"
                    } focus:ring-2 focus:ring-amber-700 outline-none`}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors({ ...errors, address: false });
                    }}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      Address is required
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className={`w-full rounded-xl p-3 border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-stone-300"
                    } focus:ring-2 focus:ring-amber-700 outline-none`}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors({ ...errors, phone: false });
                    }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      Phone number is required
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes (optional)
                  </label>
                  <input
                    className="w-full rounded-xl p-3 border border-stone-300 focus:ring-2 focus:ring-amber-700 outline-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-stone-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-800" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm border-b border-stone-100 pb-3"
                  >
                    <div>
                      <p className="font-medium text-stone-800">
                        {item.product?.name ?? item.name}
                      </p>
                      <p className="text-stone-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-stone-800">
                      ₹{Number(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-stone-800 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={proceedToPayment}
                className="w-full mt-6 bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>

              <p className="text-xs text-stone-500 text-center mt-3">
                Payments are secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
