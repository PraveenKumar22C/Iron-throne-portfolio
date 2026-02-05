import { z } from "zod";
import { contactMessages, insertContactMessageSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    create: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactMessageSchema.extend({
        email: z.string().email(),
      }),
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/contact",
      input: z.object({}).optional(),
      responses: {
        200: z.array(z.custom<typeof contactMessages.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}

export type ContactCreateInput = z.infer<typeof api.contact.create.input>;
export type ContactCreateResponse = z.infer<typeof api.contact.create.responses[201]>;
export type ContactListResponse = z.infer<typeof api.contact.list.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
