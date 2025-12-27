import CorporateHero from "../components/corporate/CorporateHero";
import { CorporateSection } from "../components/corporate/CorporateSection";
import { CorporateInquiryForm } from "../components/corporate/CorporateInquiryForm";

const CorporatePage = () => {
  return (
    <main className="bg-stone-50 min-h-screen">
      <CorporateHero />
      <CorporateSection />
      <CorporateInquiryForm />
    </main>
  );
};

export default CorporatePage;
