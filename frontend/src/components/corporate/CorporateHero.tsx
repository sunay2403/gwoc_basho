import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CorporateHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80" 
          alt="Corporate pottery workshops"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/85 via-stone-900/70 to-amber-900/60" />
      </div>

      {/* Animated Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <div className="animate-fade-in-up">
          <Leaf className="mx-auto mb-8 text-amber-300" size={56} />
        </div>

        <h1 className="animate-fade-in-up text-5xl md:text-6xl font-serif font-light mb-6 animation-delay-100">
          Corporate & Collaborations
        </h1>

        <p className="animate-fade-in-up text-xl md:text-2xl text-stone-200 mb-10 animation-delay-200">
          Thoughtful pottery experiences for corporate gifting, team workshops,
          and brand collaborations.
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center animation-delay-300">
          <button
            onClick={() =>
              document
                .getElementById("corporate-inquiry")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition transform hover:scale-105"
          >
            Start a Conversation
          </button>

          <button
            onClick={() => navigate("/home")}
            className="px-10 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-stone-900 transition transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero;
