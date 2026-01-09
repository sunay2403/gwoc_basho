type FixedParticipants = {
  type: "fixed";
  value: number;
};

type MinParticipants = {
  type: "min";
  value: number;
};

export type ParticipantsRule = FixedParticipants | MinParticipants;

export type ExperienceKey =
  | "couple"
  | "birthday"
  | "farm"
  | "studio";

export const EXPERIENCE_CONFIG: Record<
  ExperienceKey,
  {
    label: string;
    participants: ParticipantsRule;
    fields: {
      name: string;
      label: string;
    }[];
  }
> = {
  couple: {
    label: "Couple Pottery Dates",
    participants: { type: "fixed", value: 2 },
    fields: [],
  },

  birthday: {
    label: "Birthday Celebrations",
    participants: { type: "min", value: 5 },
    fields: [
      { name: "birthdayPerson", label: "Birthday Person Name" },
    ],
  },

  farm: {
    label: "Farm & Garden Mini Parties",
    participants: { type: "min", value: 6 },
    fields: [
      { name: "outdoorPreference", label: "Outdoor Preference" },
    ],
  },

  studio: {
    label: "Studio-based Experiences",
    participants: { type: "min", value: 1 },
    fields: [],
  },
};
