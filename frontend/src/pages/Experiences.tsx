import React from "react";
import { Leaf, Droplet, Mountain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="min-h-[55vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505575978878-5b7a8f39b01f?w=1600&q=80"
            alt="experience"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stone-50/70 to-stone-50"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <Leaf className="mx-auto text-amber-800 animate-pulse" size={56} strokeWidth={1} />
          <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mt-6 mb-3">Experiences</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Curated studio experiences — couple dates, private workshops, pop-ups and field trips that slow you down.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/workshops#book")}
              className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 transition"
            >
              Book an Experience
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Droplet className="text-amber-800" size={20} />
            </div>
            <h3 className="text-xl font-serif text-stone-800 mb-2">Couple Dates</h3>
            <p className="text-stone-600">Create a shared piece in a relaxed two-hour session. Includes tea and photos.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <Mountain className="text-stone-700" size={20} />
            </div>
            <h3 className="text-xl font-serif text-stone-800 mb-2">Farm & Garden Pop-ups</h3>
            <p className="text-stone-600">Outdoor sessions with clay, for groups and family-friendly mini-parties.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="text-stone-700" size={20} />
            </div>
            <h3 className="text-xl font-serif text-stone-800 mb-2">Private & Corporate</h3>
            <p className="text-stone-600">Team-building workshops and private bookings. Custom formats and catering available.</p>
            <div className="mt-4">
              <button onClick={() => navigate("/workshops#book")} className="px-4 py-2 border rounded-full text-stone-700">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif text-stone-800 mb-4">Want a bespoke experience?</h3>
          <p className="text-stone-600 mb-6">Get in touch and we’ll design an experience tailored to your group.</p>
          <button onClick={() => window.open("mailto:studio@example.com")} className="px-6 py-3 bg-amber-800 text-white rounded-full shadow">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;