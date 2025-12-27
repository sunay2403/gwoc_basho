import React, { useEffect, useState } from "react";
import { Leaf, Droplet, Mountain, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ----------------------------------
   Experience Data
-----------------------------------*/
const EXPERIENCES = [
  {
    title: "Couple Pottery Dates",
    icon: Heart,
    description:
      "An intimate studio session where couples shape clay together. Includes guided instruction, tea, glazing, and photographs.",
    note: "Perfect for anniversaries & celebrations",
    cta: "Book a Couple Date",
    link: "/workshops#book",
  },
  {
    title: "One-on-One Workshops",
    icon: Droplet,
    description:
      "Personalized pottery sessions focused on technique, mindfulness, and craftsmanship. Ideal for beginners and artists.",
    note: "Limited slots available",
    cta: "Register for Workshop",
    link: "/workshops#book",
  },
  {
    title: "Farm & Garden Experiences",
    icon: Mountain,
    description:
      "Outdoor clay sessions curated for families, birthdays, and mini garden parties. Earthy, slow, and joyful.",
    note: "Seasonal pop-ups",
    cta: "View Availability",
    link: "/studio",
  },
  {
    title: "Corporate & Private Events",
    icon: Users,
    description:
      "Team-building workshops, corporate gifting experiences, and private group bookings with custom formats.",
    note: "Custom pricing & formats",
    cta: "Request a Quote",
    link: "/corporate",
  },
];

const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  /* Page enter animation */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        bg-stone-50 min-h-screen
        transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* ----------------------------------
          HERO
      -----------------------------------*/}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505575978878-5b7a8f39b01f?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 to-stone-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <Leaf className="mx-auto text-amber-800 mb-6 animate-pulse" size={56} />
          <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-4">
            Studio Experiences
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
            Slow down. Touch clay. Create with intention.  
            Basho’s experiences reconnect you with craft, nature, and presence.
          </p>

          <button
            onClick={() => navigate("/workshops#book")}
            className="mt-10 px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg font-medium"
          >
            Book an Experience
          </button>
        </div>
      </section>

      {/* ----------------------------------
          EXPERIENCE TYPES
      -----------------------------------*/}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4">
              Experiences We Offer
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Thoughtfully curated pottery experiences for individuals,
              couples, families, and teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXPERIENCES.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  style={{ transitionDelay: `${300 + index * 120}ms` }}
                  className={`
                    bg-white rounded-3xl border border-stone-200 p-8 text-center shadow-sm
                    transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                >
                  <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <Icon size={28} className="text-amber-800" />
                  </div>

                  <h3 className="text-2xl font-serif text-stone-800 mb-3">
                    {exp.title}
                  </h3>

                  <p className="text-stone-600 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <p className="text-sm text-amber-800 font-medium mb-6">
                    {exp.note}
                  </p>

                  <button
                    onClick={() => navigate(exp.link)}
                    className="px-6 py-2 border border-amber-800 text-amber-800 rounded-full"
                  >
                    {exp.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------
          BESPOKE CTA
      -----------------------------------*/}
      <section className="py-24 px-6 bg-gradient-to-b from-amber-50/60 to-stone-50 text-center">
        <div
          className={`
            max-w-4xl mx-auto
            transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4">
            Bespoke Experiences
          </h3>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            We design custom pottery experiences for birthdays, celebrations,
            corporate teams, and cultural events.
          </p>

          <button
            onClick={() => navigate("/corporate")}
            className="px-8 py-3 bg-amber-800 text-white rounded-full shadow-lg font-medium"
          >
            Enquire for Custom Experience
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;
