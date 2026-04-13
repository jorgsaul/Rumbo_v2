import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

export const sanitizeHtml = (input: string): string => {
  return purify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      result[key] = sanitizeHtml(value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
};
