// frontend/src/pages/Workshops.tsx
import React, { useEffect, useState } from "react";
import { Leaf, Droplet, Mountain } from "lucide-react";

/* ---------------------------------- */
/* Types & Data                        */
/* ---------------------------------- */

type Slot = {
  id: number;
  title: string;
  date_label: string;
  capacity: number;
  price: string;
  remaining: number;
};

/* ---------------------------------- */
/* Page                               */
/* ---------------------------------- */

const WorkshopsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    gst: "",
    notes: "",
  });

  /* Page enter animation */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 180);
    return () => clearTimeout(t);
  }, []);

  /* Fetch workshop slots from backend */
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/workshops/");
        if (!response.ok) throw new Error("Failed to fetch slots");
        const data = await response.json();
        setSlots(data);
        if (data.length > 0) {
          setSelectedSlot(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "participants" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert("Please select a workshop session");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: selectedSlot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          participants: form.participants,
          gst: form.gst,
          notes: form.notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Booking failed");
      }

      const selectedSlotData = slots.find(s => s.id === selectedSlot);
      setSuccess(
        `Registered ${form.name || "Guest"} for ${selectedSlotData?.title || "workshop"}`
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        participants: 1,
        gst: "",
        notes: "",
      });

      // Refresh slots to update remaining availability
      const refreshResponse = await fetch("http://localhost:8000/api/workshops/");
      if (refreshResponse.ok) {
        const updatedSlots = await refreshResponse.json();
        setSlots(updatedSlots);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(`Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`
        min-h-screen bg-stone-50
        transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* ---------------------------------- */}
      {/* HERO                               */}
      {/* ---------------------------------- */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80"
          alt="Pottery studio"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/70 to-stone-50" />

        <div className="relative z-10 max-w-4xl text-center px-6">
          <Leaf className="mx-auto text-amber-800 mb-6 animate-pulse" size={56} />
          <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">
            Pottery Workshops
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
            Slow, intentional studio sessions inspired by Japanese craftsmanship —
            designed for beginners and curious makers alike.
          </p>

          <div className="mt-10">
            <button
              onClick={() =>
                document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-10 py-3 bg-amber-800 text-white rounded-full shadow-lg font-medium"
            >
              Reserve Your Spot
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* INFO + SESSIONS                    */}
      {/* ---------------------------------- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold mb-6">
              STUDIO LEARNING
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-8">
              What to Expect
            </h2>

            <p className="text-stone-600 leading-relaxed mb-10">
              Each workshop introduces wheel-throwing or hand-building,
              trimming and glazing. Sessions are intentionally small,
              calm, and guided with care.
            </p>

            <div className="space-y-8">
              <InfoRow
                icon={<Droplet size={22} />}
                title="Materials & Firing"
                text="All clays, glazes, tools and kiln firings included. Finished pieces ready in 2–3 weeks."
              />
              <InfoRow
                icon={<Mountain size={22} />}
                title="Small Groups"
                text="Limited group sizes allow personal guidance and a slower pace."
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-stone-100 shadow-xl">
            <h3 className="text-3xl font-serif text-stone-800 mb-8">
              Available Sessions
            </h3>

            {loading ? (
              <div className="text-center py-8 text-stone-500">Loading sessions...</div>
            ) : slots.length === 0 ? (
              <div className="text-center py-8 text-stone-500">No sessions available</div>
            ) : (
              <div className="space-y-4">
                {slots.map(s => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSlot(s.id)}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-colors ${
                      selectedSlot === s.id
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-semibold text-stone-800">
                          {s.title}
                        </div>
                        <div className="text-sm text-stone-500 mt-1">
                          {s.date_label} • ₹{s.price}
                        </div>
                        <div className="text-xs text-stone-500 mt-2">
                          Capacity: {s.capacity} • Available: {s.remaining}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="px-5 py-2 bg-amber-800 text-white rounded-full text-sm font-medium shadow-md"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* BOOKING FORM                      */}
      {/* ---------------------------------- */}
      <section id="book" className="py-24 px-6 bg-gradient-to-b from-stone-50 to-amber-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 border border-stone-100 shadow-2xl">
          <h3 className="text-3xl font-serif text-stone-800 mb-10">
            Book Your Workshop
          </h3>

          {success && (
            <div className="mb-10 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-14">
            <FormSection title="Contact Details">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Full Name" required>
                  <input name="name" value={form.name} onChange={handleChange} className="input" />
                </FormField>
                <FormField label="Email Address" required>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Phone (optional)">
                  <input name="phone" value={form.phone} onChange={handleChange} className="input" />
                </FormField>
                <FormField label="Participants">
                  <select name="participants" value={form.participants} onChange={handleChange} className="input">
                    {[1,2,3,4].map(n => (
                      <option key={n} value={n}>{n} participant{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Workshop Session">
              <select value={selectedSlot || ""} onChange={e => setSelectedSlot(Number(e.target.value))} className="input">
                <option value="">Select a session</option>
                {slots.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title} • {s.date_label} • ₹{s.price}
                  </option>
                ))}
              </select>
            </FormSection>

            <FormSection title="Additional Information">
              <FormField label="GST Number (optional)">
                <input name="gst" value={form.gst} onChange={handleChange} className="input" />
              </FormField>

              <FormField label="Notes / Special Requests">
                <textarea name="notes" value={form.notes} onChange={handleChange} className="input h-28 resize-none" />
              </FormField>
            </FormSection>

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-amber-800 text-white rounded-full font-semibold shadow-lg"
              >
                {submitting ? "Processing…" : "Confirm Booking"}
              </button>

              <p className="text-xs text-stone-500 text-center mt-4">
                Secure payments via Razorpay • Cancellation up to 48 hours before
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

const InfoRow = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800">
      {icon}
    </div>
    <div>
      <div className="font-semibold text-stone-800 text-lg">{title}</div>
      <div className="text-stone-600 text-sm mt-1 leading-relaxed">{text}</div>
    </div>
  </div>
);

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h4 className="text-xl font-serif text-stone-800 border-b border-stone-200 pb-2">
      {title}
    </h4>
    {children}
  </div>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-sm text-stone-600">
      {label} {required && <span className="text-amber-700">*</span>}
    </label>
    {children}
  </div>
);