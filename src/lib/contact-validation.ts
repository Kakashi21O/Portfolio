export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const SUBJECT_MAX = 200;
const MESSAGE_MAX = 2000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { _form: "Invalid request data." } };
  }

  const payload = data as Record<string, unknown>;
  const name = payload.name;
  const email = payload.email;
  const subject = payload.subject;
  const message = payload.message;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.name = "Name is required.";
  } else if (name.trim().length > NAME_MAX) {
    errors.name = `Name must be ${NAME_MAX} characters or less.`;
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.email = "Email is required.";
  } else if (email.trim().length > EMAIL_MAX) {
    errors.email = `Email must be ${EMAIL_MAX} characters or less.`;
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subject || typeof subject !== "string" || !subject.trim()) {
    errors.subject = "Subject is required.";
  } else if (subject.trim().length > SUBJECT_MAX) {
    errors.subject = `Subject must be ${SUBJECT_MAX} characters or less.`;
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length > MESSAGE_MAX) {
    errors.message = `Message must be ${MESSAGE_MAX} characters or less.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
