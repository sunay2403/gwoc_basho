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

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <Leaf className="mx-auto text-amber-800 animate-pulse" size={56} strokeWidth={1} />
          <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mt-6 mb-3 animate-slide-down">Experiences</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto animate-slide-up">
            Curated studio experiences — couple dates, private workshops, pop-ups and field trips that slow you down.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/workshops#book")}
              className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium animate-bounce-subtle"
            >
              Book an Experience
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4">Experience Types</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">Choose the perfect experience for you and your loved ones</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-stone-100 animate-fade-in-up" style={{animationDelay: '100ms'}}>
              <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6 group-hover:animate-spin">
                <Droplet className="text-amber-800 group-hover:animate-bounce" size={24} />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-3">Couple Dates</h3>
              <p className="text-stone-600 leading-relaxed mb-6">Create a shared piece in a relaxed two-hour session. Includes tea and photos.</p>
              <div className="text-sm text-amber-800 font-medium">Perfect for anniversaries & celebrations</div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-stone-100 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <div className="w-20 h-20 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-6 hover:animate-pulse">
                <Mountain className="text-stone-700" size={24} />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-3">Farm & Garden Pop-ups</h3>
              <p className="text-stone-600 leading-relaxed mb-6">Outdoor sessions with clay, for groups and family-friendly mini-parties.</p>
              <div className="text-sm text-stone-600 font-medium">Seasonal availability</div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-stone-100 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <div className="w-20 h-20 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-6 hover:animate-bounce">
                <Leaf className="text-stone-700" size={24} />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-3">Private & Corporate</h3>
              <p className="text-stone-600 leading-relaxed mb-6">Team-building workshops and private bookings. Custom formats and catering available.</p>
              <button onClick={() => navigate("/workshops#book")} className="px-6 py-2 border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-50 hover:scale-110 transition-all duration-300 font-medium">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-amber-50/50 to-stone-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 animate-fade-in">
          <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4 animate-slide-down">Bespoke Experiences</h3>
          <p className="text-lg text-stone-600 mb-8 leading-relaxed animate-slide-up">Don't see what you're looking for? Let's design an experience tailored to your group.</p>
          <button onClick={() => window.open("mailto:studio@example.com")} className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium animate-bounce-subtle">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;