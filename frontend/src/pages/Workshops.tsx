// frontend/src/pages/Workshops.tsx
import React, { useState } from "react";
import { Leaf, Mountain, Droplet } from "lucide-react";

type Slot = {
  id: string;
  title: string;
  date: string;
  capacity: number;
  price?: string;
};

const slots: Slot[] = [
  { id: "sat-morn", title: "Saturday — Morning", date: "Sat • 10:00 — 12:30", capacity: 10, price: "₹1200" },
  { id: "sat-ev", title: "Saturday — Evening", date: "Sat • 16:00 — 18:30", capacity: 10, price: "₹1200" },
  { id: "sun-all", title: "Weekend Intensive", date: "Sun • 10:00 — 15:00", capacity: 6, price: "₹2400" },
  { id: "private", title: "Private 1:1 Session", date: "By appointment", capacity: 1, price: "₹3500" }
];

const WorkshopsPage: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>(slots[0].id);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    gst: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "participants" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — replace with API call
    await new Promise(res => setTimeout(res, 700));
    setSubmitting(false);
    setSuccess(`Registered ${form.name || "Guest"} for ${slots.find(s => s.id === selectedSlot)?.title}`);
    setForm({ name: "", email: "", phone: "", participants: 1, gst: "", notes: "" });
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80"
            alt="pottery studio"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stone-50/70 to-stone-50"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <Leaf className="mx-auto text-amber-800 animate-pulse" size={56} strokeWidth={1} />
          <h1 className="text-6xl md:text-7xl font-serif font-light text-stone-800 mt-6 mb-3">Workshops</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Slow down, get your hands muddy, and make something honest. Workshops for beginners to
            makers — small groups, intentional practice.
          </p>
          <div className="mt-8">
            <button
              onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 transition"
            >
              Book a Spot
            </button>
          </div>
        </div>
      </section>

      {/* Info + Slots */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-900 rounded-full text-sm mb-6">
              Studio Learning
            </span>
            <h2 className="text-4xl font-serif font-light text-stone-800 mb-4">What to expect</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Each session covers wheel-throwing basics or hand-building, shaping, trimming and a simple glazing demo.
              Materials, firing and tea are included. Small class sizes keep the experience personal.
            </p>

            <div className="grid gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Droplet className="text-amber-800" size={20} />
                </div>
                <div>
                  <div className="font-medium text-stone-800">Materials & Firing</div>
                  <div className="text-sm text-stone-600">All clays and glazes included. We glaze and fire your pieces for later pickup.</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <Mountain className="text-stone-700" size={20} />
                </div>
                <div>
                  <div className="font-medium text-stone-800">Small Groups</div>
                  <div className="text-sm text-stone-600">Max 10 per session — focused guidance and hands-on help.</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-serif text-stone-800 mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {slots.map(s => (
                  <div key={s.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <div className="font-medium text-stone-800">{s.title}</div>
                      <div className="text-sm text-stone-500">{s.date} • {s.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-stone-500">Seats: {s.capacity}</div>
                      <button
                        onClick={() => {
                          setSelectedSlot(s.id);
                          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-2 px-3 py-1 bg-amber-800 text-white rounded-full text-sm hover:bg-amber-900 transition"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="py-16 px-6 bg-linear-to-b from-stone-50 to-amber-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-serif text-stone-800 mb-4">Reserve your spot</h3>

              {success && (
                <div className="mb-4 p-3 rounded-md bg-emerald-50 text-emerald-800">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full p-3 border rounded-lg" />
                  <input name="email" value={form.email} onChange={handleChange} required placeholder="Email address" className="w-full p-3 border rounded-lg" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="w-full p-3 border rounded-lg" />
                  <select name="participants" value={form.participants} onChange={handleChange} className="w-full p-3 border rounded-lg">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n} participant{n>1?'s':''}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-stone-600">Select session</label>
                  <select name="slot" value={selectedSlot} onChange={(e)=>setSelectedSlot(e.target.value)} className="w-full p-3 border rounded-lg mt-2">
                    {slots.map(s => <option key={s.id} value={s.id}>{s.title} • {s.date} • {s.price}</option>)}
                  </select>
                </div>

                <div>
                  <input name="gst" value={form.gst} onChange={handleChange} placeholder="GST number (optional, for invoice)" className="w-full p-3 border rounded-lg" />
                </div>

                <div>
                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any notes or accessibility requirements" className="w-full p-3 border rounded-lg h-28" />
                </div>

                <div className="flex items-center space-x-3">
                  <button type="submit" disabled={submitting} className="px-6 py-3 bg-amber-800 text-white rounded-full shadow hover:bg-amber-900 transition">
                    {submitting ? "Submitting…" : "Confirm Booking"}
                  </button>
                  <button type="button" onClick={()=>{ setForm({ name:"", email:"", phone:"", participants:1, gst:"", notes:"" }); setSuccess(null); }} className="px-4 py-2 border rounded-full text-stone-700">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=1200&q=80" alt="workshop" className="w-full h-64 object-cover" />
              <div className="p-6 bg-white">
                <h4 className="text-xl font-medium text-stone-800 mb-2">Private & Group Experiences</h4>
                <p className="text-stone-600 mb-4">
                  We run pop-up events, couple sessions and corporate workshops. Get in touch for custom bookings and team-building.
                </p>
                <div className="text-sm text-stone-500">
                  <div className="mb-2"><strong>Pickup:</strong> Your finished pieces will be ready for pickup in 2–3 weeks.</div>
                  <div className="mb-2"><strong>Payment:</strong> Secure payments via Razorpay at checkout (integrate backend for live payment).</div>
                  <div><strong>Cancellation:</strong> Full refund up to 48 hours before session.</div>
                </div>
                <div className="mt-6">
                  <button onClick={()=>window.open("mailto:studio@example.com")} className="px-4 py-2 border rounded-full text-stone-700">
                    Corporate / Private Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif text-stone-800 mb-4">Bring Basho to your table</h3>
          <p className="text-stone-600 mb-6">Workshops run every weekend — book early to secure your spot.</p>
          <button onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3 bg-amber-800 text-white rounded-full shadow">
            Book a Workshop
          </button>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;