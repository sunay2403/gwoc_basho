import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-order/`,
        { amount: state!.amount }
      );

      const options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: "INR",
        name: "My App",
        description: state!.description,
        order_id: response.data.order_id,
        prefill: state!.user,
        theme: { color: "#0f172a" },

        handler: (res: any) => {
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
      alert("Unable to initiate payment. Please try again.");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-stone-600">
        Redirecting to secure payment…
      </p>
    </div>
  );
};

export default PaymentPage;
