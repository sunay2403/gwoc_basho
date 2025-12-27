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
    if (!form.message.trim()) newErrors.message = "Please describe your requirement";

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

    // 🔹 mock API delay
    await new Promise(res => setTimeout(res, 1200));

    console.log("Corporate Inquiry:", form);

    setIsSubmitting(false);
    setIsSuccess(true);
    setForm(initialState);
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
