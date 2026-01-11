import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";


const API_BASE = import.meta.env.VITE_API_BASE_URL;



type LocationState = {
  productId?: number;
  productName?: string;
};

const CustomOrder = () => {
  const { state } = useLocation();
  const { productId, productName } = (state || {}) as LocationState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* ------------------ File Handling ------------------ */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  /* ------------------ Submit ------------------ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("requirements", requirements);

      if (productId) {
        formData.append("product_id", String(productId));
      }

      files.forEach(file => {
        formData.append("images", file); // backend should expect `images`
      });

      await fetch(`${API_BASE}/api/custom-orders/create/`, {
    method: "POST",
    body: formData,
});


      alert("Custom order request submitted successfully!");
      setName("");
      setEmail("");
      setRequirements("");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit custom order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-serif font-light text-stone-800 mb-2">
          Custom Order Request
        </h1>

        {productName && (
          <p className="text-stone-600 mb-6">
            For product:{" "}
            <span className="font-semibold text-stone-800">
              {productName}
            </span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Name
            </label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Custom Requirements
            </label>
            <textarea
              rows={5}
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              placeholder="Material, size, design ideas, budget, deadline..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          {/* Reference Images */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Reference Images (optional)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm"
            />

            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.map((file, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-xs hidden group-hover:flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-amber-800 text-white rounded-xl font-semibold hover:bg-amber-900 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Custom Order Request"}
          </button>
        </form>
      </div>

      <PreviousCustomOrders />
    </div>
  );
};

/* ------------------ Showcase ------------------ */

type ShowcaseOrder = {
  id: number;
  requirements: string;
  images: { id: number; image: string }[];
};

const PreviousCustomOrders = () => {
  const [orders, setOrders] = useState<ShowcaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShowcase = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/custom-orders/showcase/`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load showcase", err);
      } finally {
        setLoading(false);
      }
    };

    loadShowcase();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-16 text-stone-600">
        Loading previous custom orders…
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-16 text-stone-600">
        No custom orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-serif font-light text-stone-800 mb-8 text-center">
        Previous Custom Creations
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {orders.map(order => {
          const firstImage = order.images[0]?.image;
          
          

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden group"
            >
              {/* Image */}
              <div className="h-56 bg-stone-100 overflow-hidden">
                {firstImage ? (
                  <img
                    src={`${API_BASE}${firstImage}`}
                    alt="Custom order"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-stone-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-5">
                <p className="text-stone-800 font-semibold line-clamp-2">
                  {order.requirements}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomOrder;
