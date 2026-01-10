export default function RazorpayCheckout() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const payNow = async () => {
    const res = await fetch(`${API}/api/payments/create-order/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 })
    });

    const order = await res.json();

    const options = {
  key: order.key,
  amount: order.amount,
  currency: order.currency,
  order_id: order.order_id,
  name: "Test Payment",
  description: "Razorpay Test",

  method: {
    card: true,
    upi: false,
    netbanking: false,
    wallet: false,
  },

  prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9999999999",
  },

  theme: {
    color: "#3399cc",
  },

  handler: async (response: any) => {
    await fetch(`${API}/api/payments/verify-payment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });
    alert("Payment successful 🎉");
  },
};


    const rzp = new (window as any).Razorpay(options);

rzp.on("payment.failed", (response: any) => {
  console.error("PAYMENT FAILED:", response);
  alert("Payment failed. Check console.");
});

rzp.open();

  };

  return (
    <div>
      <h2>Razorpay Test Payment</h2>
      <button onClick={payNow}>Pay ₹500</button>
    </div>
  );
}
