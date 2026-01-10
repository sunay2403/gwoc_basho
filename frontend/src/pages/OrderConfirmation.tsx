import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  if (!state?.items) {
    return <p>Invalid order</p>;
  }

  const { items, subtotal } = state;

  const proceedToPayment = () => {
    if (!address || !phone) {
      alert("Please enter address and phone number");
      return;
    }

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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Confirm Your Order</h1>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <ul className="space-y-2">
          {items.map((it: any) => (
            <li key={it.id} className="flex justify-between">
              <span>
                {it.product?.name ?? it.name} × {it.quantity}
              </span>
              <span>₹{Number(it.price) * it.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="font-semibold mt-3">
          Total: ₹{subtotal.toFixed(2)}
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Delivery Address</label>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          className="w-full border rounded p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Notes (optional)</label>
        <input
          className="w-full border rounded p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button
        onClick={proceedToPayment}
        className="px-6 py-3 bg-green-600 text-white rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderConfirmation;
