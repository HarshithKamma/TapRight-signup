"use client";

import { useState } from "react";

type FormFields = {
  fullName: string;
  email: string;
  spendFocus: string;
  notes: string;
  optIn: boolean;
};

type FormErrors = Record<keyof Omit<FormFields, "optIn">, string> & {
  optIn: string;
};

const initialState: FormFields = {
  fullName: "",
  email: "",
  spendFocus: "",
  notes: "",
  optIn: false,
};

const initialErrors: FormErrors = {
  fullName: "",
  email: "",
  spendFocus: "",
  notes: "",
  optIn: "",
};

const validators: Record<keyof FormFields, (value: string | boolean) => string> =
  {
    fullName: (value) =>
      typeof value === "string" && value.trim().length >= 2
        ? ""
        : "Please enter your full name.",
    email: (value) => {
      if (typeof value !== "string") return "Enter a valid email.";
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim())
        ? ""
        : "Enter a valid email address.";
    },
    spendFocus: (value) =>
      typeof value === "string" && value
        ? ""
        : "Let us know what you optimise for.",
    notes: () => "",
    optIn: (value) =>
      value === true ? "" : "Please confirm you want to receive updates.",
  };

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [formState, setFormState] = useState<FormFields>(initialState);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const disableSubmit = status === "loading";

  const validateField = (field: keyof FormFields, value: string | boolean) => {
    const validator = validators[field];
    if (!validator) return "";

    const errorMessage = validator(value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return errorMessage;
  };

  const handleChange = (
    field: keyof FormFields,
    value: string | boolean,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (
    field: keyof FormFields,
    value: string | boolean,
  ) => {
    validateField(field, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;
    (Object.keys(formState) as Array<keyof FormFields>).forEach((field) => {
      const value = formState[field];
      const result = validateField(field, value);
      if (result) valid = false;
    });

    if (!valid) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          optIn: formState.optIn,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        if (payload?.errors) {
          setErrors((prev) => ({ ...prev, ...payload.errors }));
        }
        throw new Error(
          payload?.message ?? "We couldn't add you to the waitlist just yet.",
        );
      }

      const payload = await response.json();
      setStatus("success");
      setMessage(
        payload?.message ?? "Great news—you're in! Keep an eye on your inbox for next steps.",
      );
      setFormState(initialState);
      setErrors(initialErrors);
    } catch (error) {
      setStatus("error");
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="hero-form-card">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row-horizontal">
          <div className={`form-row${errors.fullName ? " invalid" : ""}`}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder=""
              value={formState.fullName}
              onChange={(event) =>
                handleChange("fullName", event.currentTarget.value)
              }
              onBlur={(event) => handleBlur("fullName", event.currentTarget.value)}
              required
              autoComplete="name"
            />
            <small className="error-message">{errors.fullName}</small>
          </div>

          <div className={`form-row${errors.email ? " invalid" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=""
              value={formState.email}
              onChange={(event) =>
                handleChange("email", event.currentTarget.value)
              }
              onBlur={(event) => handleBlur("email", event.currentTarget.value)}
              required
              autoComplete="email"
            />
            <small className="error-message">{errors.email}</small>
          </div>
        </div>

        <div className="form-row-horizontal">
          <div className={`form-row${errors.spendFocus ? " invalid" : ""}`}>
            <label htmlFor="spendFocus">Primary Spend Focus</label>
            <select
              id="spendFocus"
              name="spendFocus"
              value={formState.spendFocus}
              onChange={(event) =>
                handleChange("spendFocus", event.currentTarget.value)
              }
              onBlur={(event) =>
                handleBlur("spendFocus", event.currentTarget.value)
              }
              required
            >
              <option value="">Where do you optimize?</option>
              <option value="travel">Travel & airlines</option>
              <option value="dining">Dining & entertainment</option>
              <option value="gas">Gas stations</option>
              <option value="rent">Rent</option>
              <option value="everyday">Everyday cashback</option>
              <option value="other">Other</option>
            </select>
            <small className="error-message">{errors.spendFocus}</small>
          </div>

          <div className="form-row">
            <label htmlFor="notes">What would make TapRight a must-have?</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder=""
              value={formState.notes}
              onChange={(event) =>
                handleChange("notes", event.currentTarget.value)
              }
            />
            <small className="error-message">{errors.notes}</small>
          </div>
        </div>

        <div className={`form-row checkbox-row${errors.optIn ? " invalid" : ""}`}>
          <label className="checkbox" htmlFor="optIn">
            <input
              id="optIn"
              name="optIn"
              type="checkbox"
              checked={formState.optIn}
              onChange={(event) => {
                handleChange("optIn", event.currentTarget.checked);
                if (errors.optIn) {
                  validateField("optIn", event.currentTarget.checked);
                }
              }}
              onBlur={(event) => handleBlur("optIn", event.currentTarget.checked)}
              required
            />
            <span>I agree to receive early access updates and product emails.</span>
          </label>
          <small className="error-message">{errors.optIn}</small>
        </div>

        <button type="submit" className="primary-btn" disabled={disableSubmit}>
          {disableSubmit ? "Joining..." : "Join Waitlist"}
        </button>

        <p className="form-footnote">
          We’ll only email when there’s something worth your time. No spam.
        </p>

        {message && (
          <div
            className={`form-success${
              status === "success" ? " visible" : status === "error" ? " visible error" : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}