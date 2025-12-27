import { corporateServices } from "../../data/corporateServices";
import { CorporateCard } from "./CorporateCard";
import { useInView } from "../../hooks/useInView";

export const CorporateSection = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="corporate" className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Title */}
        <h2
          className={`text-5xl font-serif text-stone-800 mb-6
          ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Corporate & Collaborations
        </h2>

        {/* Subtitle */}
        <p
          className={`text-xl text-stone-600 mb-16
          ${isVisible ? "animate-fade-in-up animation-delay-150" : "opacity-0"}`}
        >
          Thoughtful pottery experiences for teams, partners, and brands
        </p>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {corporateServices.map((service, index) => (
            <div
              key={service.id}
              className={`
                ${isVisible ? "animate-fade-in-up" : "opacity-0"}
              `}
              style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
            >
              <CorporateCard service={service} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
