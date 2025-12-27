export interface CorporateService {
  id: string;
  title: string;
  description: string;
}

export const corporateServices: CorporateService[] = [
  {
    id: "gifting",
    title: "Corporate Gifting",
    description:
      "Handcrafted pottery sets curated for corporate gifting, festivals, and milestones."
  },
  {
    id: "workshops",
    title: "Team Workshops",
    description:
      "Mindful pottery workshops designed for team bonding, creativity, and relaxation."
  },
  {
    id: "collaboration",
    title: "Brand Collaborations",
    description:
      "Limited-edition collections and co-branded pieces with aligned brands."
  }
];
