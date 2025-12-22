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

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <Leaf className="mx-auto text-amber-800 animate-pulse" size={56} strokeWidth={1} />
          <h1 className="text-6xl md:text-7xl font-serif font-light text-stone-800 mt-6 mb-3 animate-slide-down">Workshops</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto animate-slide-up">
            Slow down, get your hands muddy, and make something honest. Workshops for beginners to
            makers — small groups, intentional practice.
          </p>
          <div className="mt-8">
            <button
              onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium animate-bounce-subtle"
            >
              Book a Spot
            </button>
          </div>
        </div>
      </section>

      {/* Info + Slots */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
          <div className="animate-fade-in-left">
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold mb-6 tracking-wide hover:scale-110 transition-transform">
              STUDIO LEARNING
            </span>
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-6 animate-slide-down">What to Expect</h2>
            <p className="text-stone-600 leading-relaxed mb-6 animate-slide-up">
              Each session covers wheel-throwing basics or hand-building, shaping, trimming and a simple glazing demo.
              Materials, firing and tea are included. Small class sizes keep the experience personal.
            </p>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-stone-50 transition-all duration-300 hover:translate-x-2 cursor-pointer group animate-fade-in-up" style={{animationDelay: '100ms'}}>
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Droplet className="text-amber-800 group-hover:animate-bounce" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-stone-800 text-lg">Materials & Firing</div>
                  <div className="text-stone-600 leading-relaxed mt-1">All clays and glazes included. We glaze and fire your pieces for later pickup.</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-stone-50 transition-all duration-300 hover:translate-x-2 cursor-pointer group animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                  <Mountain className="text-stone-700 group-hover:animate-pulse" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-stone-800 text-lg">Small Groups</div>
                  <div className="text-stone-600 leading-relaxed mt-1">Max 10 per session — focused guidance and hands-on help.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-stone-100 backdrop-blur-sm">
              <h3 className="text-3xl font-serif text-stone-800 mb-6 animate-slide-down">Sessions</h3>
              <div className="space-y-4">
                {slots.map((s, idx) => (
                  <div key={s.id} className="flex items-center justify-between border-2 border-stone-100 rounded-2xl p-4 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group animate-fade-in-up" style={{animationDelay: `${300 + idx * 100}ms`}}>
                    <div className="flex-1">
                      <div className="font-semibold text-stone-800 text-lg group-hover:text-amber-800 transition-colors">{s.title}</div>
                      <div className="text-sm text-stone-500 mt-1 group-hover:text-stone-700 transition-colors">{s.date} • {s.price}</div>
                      <div className="text-xs text-stone-500 mt-2">Capacity: {s.capacity}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSlot(s.id);
                        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-5 py-2 bg-amber-800 text-white rounded-full text-sm hover:bg-amber-900 hover:scale-110 transition-all duration-300 font-medium ml-4 shadow-md group-hover:shadow-lg"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="py-20 px-6 bg-gradient-to-b from-stone-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
          <div className="order-2 md:order-1 animate-fade-in-left">
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-stone-100 backdrop-blur-sm">
              <h3 className="text-3xl font-serif text-stone-800 mb-6 animate-slide-down">Book Your Spot</h3>

              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium animate-bounce-in">
                  ✓ {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                  <input name="email" value={form.email} onChange={handleChange} required placeholder="Email address" className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                  <select name="participants" value={form.participants} onChange={handleChange} className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n} participant{n>1?'s':''}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Select session</label>
                  <select name="slot" value={selectedSlot} onChange={(e)=>setSelectedSlot(e.target.value)} className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all">
                    {slots.map(s => <option key={s.id} value={s.id}>{s.title} • {s.date} • {s.price}</option>)}
                  </select>
                </div>

                <div>
                  <input name="gst" value={form.gst} onChange={handleChange} placeholder="GST number (optional)" className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                </div>

                <div>
                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special requests or accessibility needs" className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none h-24" />
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-amber-800 text-white rounded-full font-semibold shadow-lg hover:bg-amber-900 transition-all disabled:opacity-50">
                    {submitting ? "Processing…" : "Confirm Booking"}
                  </button>
                  <button type="button" onClick={()=>{ setForm({ name:"", email:"", phone:"", participants:1, gst:"", notes:"" }); setSuccess(null); }} className="px-6 py-3 border-2 border-stone-300 rounded-full text-stone-700 font-semibold hover:bg-stone-50 transition-colors">
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="order-1 md:order-2 animate-fade-in-right">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-100 h-full hover:shadow-2xl transition-shadow duration-300 group">
              <img src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=1200&q=80" alt="workshop" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="p-8 bg-white">
                <h4 className="text-2xl font-serif text-stone-800 mb-3 animate-slide-down">Custom Experiences</h4>
                <p className="text-stone-600 mb-6 leading-relaxed animate-slide-up">
                  We run pop-up events, couple sessions and corporate workshops. Get in touch for custom bookings and team-building.
                </p>
                <div className="space-y-3 text-stone-600 text-sm mb-6">
                  <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform"><span className="font-semibold text-amber-800 mt-0.5">→</span><span><strong>Pickup:</strong> Your finished pieces will be ready in 2–3 weeks.</span></div>
                  <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform"><span className="font-semibold text-amber-800 mt-0.5">→</span><span><strong>Payment:</strong> Secure payments via Razorpay at checkout.</span></div>
                  <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform"><span className="font-semibold text-amber-800 mt-0.5">→</span><span><strong>Cancellation:</strong> Full refund up to 48 hours before.</span></div>
                </div>
                <button onClick={()=>window.open("mailto:studio@example.com")} className="w-full px-6 py-3 border-2 border-amber-800 text-amber-800 rounded-full font-semibold hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                  Inquiry
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-amber-50/30 to-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 animate-fade-in">
          <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4 animate-slide-down">Ready to Get Started?</h3>
          <p className="text-lg text-stone-600 mb-8 leading-relaxed animate-slide-up">Workshops run every weekend — reserve your spot early for the session that works for you.</p>
          <button onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold animate-bounce-subtle">
            Scroll to Booking
          </button>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;