import { en } from "./messages/en";
import { es } from "./messages/es";
import { no } from "./messages/no";
import { sv } from "./messages/sv";
import type { Locale, Messages } from "./types";

export const MESSAGES: Record<Locale, Messages> = {
  en,
  no,
  sv,
  es,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] ?? MESSAGES.en;
}

export * from "./types";
export { LOCALES, LOCALE_STORAGE_KEY } from "./types";
