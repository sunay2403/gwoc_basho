import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../api/cart";
import { auth } from "../api/firebase";

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
  const [error, setError] = useState<string | null>(null);

  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.amount) {
      navigate("/", { replace: true });
      return;
    }

    initiatePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyPayment = async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) => {
    try {
      // attach Firebase ID token for backend authentication
      const currentUser = auth.currentUser;
      const idToken = currentUser ? await currentUser.getIdToken(true) : null;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/verify-payment/`,
        {
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature,
        },
        {
          headers: {
            Authorization: idToken ? `Bearer ${idToken}` : undefined,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // 🧹 Clear cart AFTER successful payment verification
        try {
          await clearCart();
        } catch (err) {
          console.error("Cart clear failed:", err);
        }

        // 3️⃣ Redirect to Thank You page with payment details
        navigate("/thank-you", {
          replace: true,
          state: {
            amount: state!.amount,
            items: state!.items,
            paymentId: razorpayPaymentId,
            orderId: razorpayOrderId,
          },
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Payment verification failed";
      setError(errorMessage);
      console.error("Payment verification error:", error);

      // Navigate to error page or show error modal
      setTimeout(() => {
        navigate("/", {
          replace: true,
          state: { paymentError: errorMessage },
        });
      }, 3000);
    }
  };

  const initiatePayment = async () => {
    try {
      // 1️⃣ Create Razorpay order from backend
      const currentUser = auth.currentUser;
      const idToken = currentUser ? await currentUser.getIdToken(true) : null;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-order/`,
        {
          amount: state!.amount,
          description: state!.description,
          items: state!.items || [],
        },
        {
          headers: {
            Authorization: idToken ? `Bearer ${idToken}` : undefined,
            "Content-Type": "application/json",
          },
        }
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

        // 2️⃣ Razorpay success handler - VERIFY payment with backend
        handler: async (res: any) => {
          try {
            // Call backend to verify payment and send email
            await verifyPayment(
              res.razorpay_order_id,
              res.razorpay_payment_id,
              res.razorpay_signature
            );
          } catch (err) {
            console.error("Payment handler error:", err);
            setError("An error occurred while processing your payment");
          }
        },

        // Error handler
        modal: {
          ondismiss: () => {
            setError("Payment cancelled by user");
            navigate("/", {
              replace: true,
              state: { paymentError: "Payment cancelled by user" },
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to create order";
      setError(errorMessage);
      console.error("Order creation error:", error);

      // Navigate back with error
      setTimeout(() => {
        navigate("/", {
          replace: true,
          state: { paymentError: errorMessage },
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4">
      <div className="bg-white border border-stone-200 rounded-2xl px-8 py-6 shadow-sm text-center">
        {error ? (
          <>
            <p className="text-lg font-medium text-red-600 mb-2">
              ✗ {error}
            </p>
            <p className="text-sm text-stone-500">
              Redirecting you back...
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-medium text-stone-700 mb-2">
              Redirecting to secure payment
            </p>
            <p className="text-sm text-stone-500">
              Please do not refresh or go back
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
