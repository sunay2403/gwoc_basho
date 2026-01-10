import axios from "axios";
import { useState } from "react";
import { EXPERIENCE_CONFIG } from "../api/experience_config";
import type { ExperienceKey } from "../api/experience_config";

const ExperienceRegistration = () => {
  const [experience, setExperience] = useState<ExperienceKey | "">("");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const config = experience ? EXPERIENCE_CONFIG[experience] : null;
  const rule = config?.participants;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experience,
      date: formData.date,
      participants:
        rule?.type === "fixed"
          ? rule.value
          : Number(formData.participants),
      message: formData.message || "",
      extra_data: Object.fromEntries(
        Object.entries(formData).filter(([key]) =>
          key.startsWith("extra_")
        )
      ),
    };

    await axios.post(
      "http://127.0.0.1:8000/api/experiences/register/",
      payload
    );

    alert("Registered successfully!");
  };

  return (
    <section className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md border border-stone-200 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-light text-stone-800 mb-3">
            Register for an Experience
          </h1>
          <p className="text-stone-600">
            Thoughtfully curated pottery experiences for every occasion
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="input"
          />

          {/* Experience */}
          <select
            required
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value as ExperienceKey)
            }
            className="input"
          >
            <option value="">Select Experience</option>
            {Object.entries(EXPERIENCE_CONFIG).map(([key, v]) => (
              <option key={key} value={key}>
                {v.label}
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            className="input"
          />

          {/* Participants */}
          {rule?.type === "min" && (
            <input
              type="number"
              name="participants"
              placeholder={`Participants (min ${rule.value})`}
              min={rule.value}
              onChange={handleChange}
              required
              className="input"
            />
          )}

          {rule?.type === "fixed" && (
            <div className="rounded-xl bg-amber-50 text-amber-800 px-4 py-3 text-center font-medium">
              Participants: {rule.value}
            </div>
          )}

          {/* Dynamic Extra Fields */}
          {config?.fields.map((field) => (
            <input
              key={field.name}
              name={`extra_${field.name}`}
              placeholder={field.label}
              onChange={handleChange}
              required
              className="input"
            />
          ))}

          {/* Message */}
          <textarea
            name="message"
            placeholder="Additional notes or special requests"
            rows={4}
            onChange={handleChange}
            className="input resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-amber-800 text-white rounded-full font-medium shadow-lg hover:bg-amber-900 transition"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </section>
  );
};

export default ExperienceRegistration;
