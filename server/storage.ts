import { db } from "./db";
import {
  contactMessages,
  type ContactMessageResponse,
  type CreateContactMessageRequest,
} from "@shared/schema";

export interface IStorage {
  listContactMessages(): Promise<ContactMessageResponse[]>;
  createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async listContactMessages(): Promise<ContactMessageResponse[]> {
    return await db.select().from(contactMessages);
  }

  async createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse> {
    const [created] = await db
      .insert(contactMessages)
      .values(input)
      .returning();

    return created;
  }
}

export const storage = new DatabaseStorage();
