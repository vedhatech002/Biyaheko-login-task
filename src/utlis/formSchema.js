import { z } from "zod";

const countryStates = {
  IN: ["TN", "KL", "MH"], // example valid states for India
  US: ["CA", "TX", "NY"],
  UK: ["LDN"],
};

export const loginSchema = z.object({
  terminalId: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .regex(/^\d+$/, "Phone must contain digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number too long"),
    passportNumber: z.string().min(6, "Passport number is required"),
    dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine((d) => new Date(d) < new Date(), {
        message: "Date of birth must be in the past",
      }),
    country: z.string().nonempty("Please select a country"),
    state: z.string().nonempty("Please select a state"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  // confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  // state must belong to the chosen country
  .refine(
    (data) => {
      const valid = countryStates[data.country] ?? null;
      if (!valid) return true; // no mapping => don't validate
      return valid.includes(data.state);
    },
    {
      message: "Invalid state for selected country",
      path: ["state"],
    }
  );
