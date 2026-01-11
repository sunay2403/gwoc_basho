import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../api/cart";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type LocationState = {
  amount: number;
  description: string;
  items?: any[];
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.amount) {
      navigate("/", { replace: true });
      return;
    }

    initiatePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initiatePayment = async () => {
    try {
      // 1️⃣ Create Razorpay order from backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-order/`,
        { amount: state!.amount }
      );

      const options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: "INR",
        name: "Basho Studio",
        description: state!.description,
        order_id: response.data.order_id,
        prefill: state!.user,
        theme: { color: "#92400e" }, // amber-800

        // 2️⃣ Razorpay success handler
        handler: async (res: any) => {
          try {
            // 🧹 Clear cart AFTER successful payment
            await clearCart();
          } catch (err) {
            console.error("Cart clear failed:", err);
          }

          // 3️⃣ Redirect to Thank You page
          navigate("/thank-you", {
            replace: true,
            state: {
              amount: state!.amount,
              items: state!.items,
              paymentId: res.razorpay_payment_id,
            },
          });
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4">
      <div className="bg-white border border-stone-200 rounded-2xl px-8 py-6 shadow-sm text-center">
        <p className="text-lg font-medium text-stone-700 mb-2">
          Redirecting to secure payment
        </p>
        <p className="text-sm text-stone-500">
          Please do not refresh or go back
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
