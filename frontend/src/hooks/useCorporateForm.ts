import { useState } from "react";

interface CorporateInquiry {
  name: string;
  email: string;
  company: string;
  serviceType: "gifting" | "workshop" | "collaboration";
  message: string;
}

type CorporateFormErrors = Partial<
  Record<keyof CorporateInquiry, string>
>;

const initialState: CorporateInquiry = {
  name: "",
  email: "",
  company: "",
  serviceType: "gifting",
  message: ""
};

export const useCorporateForm = () => {
  const [form, setForm] = useState<CorporateInquiry>(initialState);
  const [errors, setErrors] = useState<CorporateFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (
    field: keyof CorporateInquiry,
    value: string
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: CorporateFormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.message.trim())
      newErrors.message = "Please describe your requirement";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/corporate/inquiry/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.detail || "Submission failed");
      }

      setIsSuccess(true);
      setForm(initialState);
    } catch (err) {
      console.error("Corporate inquiry failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => setForm(initialState);

  return {
    form,
    errors,
    isSubmitting,
    isSuccess,
    updateField,
    submit,
    resetForm
  };
};
