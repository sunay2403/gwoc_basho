interface CorporateService {
  id: string;
  title: string;
  description: string;
}

interface Props {
  service: CorporateService;
}

export const CorporateCard = ({ service }: Props) => {
  return (
    <div className="w-full h-full p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition">
      <h3 className="text-2xl font-serif text-stone-800 mb-4">
        {service.title}
      </h3>
      <p className="text-stone-600 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};
