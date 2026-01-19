import emailjs from "@emailjs/browser";
import type { InsertMessage } from "./api-mock";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactEmail(data: InsertMessage) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("Email service is not configured. Please set EmailJS environment variables.");
  }

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
  });
}

