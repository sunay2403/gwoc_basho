import { useCorporateForm } from "../../hooks/useCorporateForm";

export const CorporateInquiryForm = () => {
  const {
    form,
    errors,
    isSubmitting,
    isSuccess,
    updateField,
    submit,
    resetForm
  } = useCorporateForm();

  /* ---------------- SUCCESS STATE ---------------- */
  if (isSuccess) {
    return (
      <section
        id="corporate-inquiry"
        className="max-w-3xl mx-auto mt-24 bg-white p-12 rounded-3xl shadow-xl text-center animate-fade-in-up"
      >
        <h3 className="text-3xl font-serif text-stone-800 mb-4">
          Thank you ✨
        </h3>
        <p className="text-stone-600 text-lg mb-8">
          We’ve received your inquiry. Our team will reach out to you shortly.
        </p>

        <button
          onClick={resetForm}
          className="px-8 py-3 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition"
        >
          Submit another inquiry
        </button>
      </section>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <form
      id="corporate-inquiry"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="max-w-3xl mx-auto mt-24 bg-white p-10 rounded-3xl shadow-xl animate-fade-in-up"
    >
      <h3 className="text-3xl font-serif text-stone-800 mb-10">
        Corporate Inquiry
      </h3>

      {/* Name */}
      <Field
        label="Your Name"
        value={form.name}
        error={errors.name}
        disabled={isSubmitting}
        onChange={(v) => updateField("name", v)}
      />

      {/* Email */}
      <Field
        label="Email Address"
        value={form.email}
        error={errors.email}
        disabled={isSubmitting}
        onChange={(v) => updateField("email", v)}
      />

      {/* Company */}
      <Field
        label="Company Name"
        value={form.company}
        error={errors.company}
        disabled={isSubmitting}
        onChange={(v) => updateField("company", v)}
      />

      {/* Service Type */}
      <div className="mt-6">
        <label className="block text-stone-700 font-medium">
          Service Type
        </label>
        <select
          value={form.serviceType}
          disabled={isSubmitting}
          onChange={(e) => updateField("serviceType", e.target.value)}
          className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-amber-700
            disabled:bg-stone-100"
        >
          <option value="gifting">Corporate Gifting</option>
          <option value="workshop">Team Workshops</option>
          <option value="collaboration">Brand Collaboration</option>
        </select>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label className="block text-stone-700 font-medium">
          Message
        </label>
        <textarea
          value={form.message}
          disabled={isSubmitting}
          onChange={(e) => updateField("message", e.target.value)}
          className={`mt-2 w-full h-32 rounded-xl border px-4 py-3
            focus:outline-none focus:ring-2
            ${
              errors.message
                ? "border-red-400 focus:ring-red-400"
                : "border-stone-300 focus:ring-amber-700"
            }
            disabled:bg-stone-100`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 w-full px-8 py-4 rounded-full text-white text-lg
          bg-amber-800 hover:bg-amber-900 transition
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
};

/* ---------------- FIELD COMPONENT ---------------- */

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const Field = ({
  label,
  value,
  error,
  disabled,
  onChange
}: FieldProps) => {
  return (
    <div className="mt-6">
      <label className="block text-stone-700 font-medium">
        {label}
      </label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-xl border px-4 py-3
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-stone-300 focus:ring-amber-700"
          }
          disabled:bg-stone-100`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
