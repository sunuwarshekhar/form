import { z } from "zod";

export const inputFields = [
  { id: "username", label: "Username", type: "string", validation: z.string().min(3, "Username must be at least 3 characters") },
  { id: "dob", label: "Date of Birth", type: "string", format: "date", validation: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format") },
];
