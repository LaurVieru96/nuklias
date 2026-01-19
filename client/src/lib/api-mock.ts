import { z } from "zod";
import { sendContactEmail } from "./email";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

export interface Message extends InsertMessage {
  id: number;
  createdAt: string;
}

const STORAGE_KEY = "nuklias_messages";

function getStoredMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveMessages(messages: Message[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export const apiMock = {
  messages: {
    create: async (data: InsertMessage): Promise<Message> => {
      const validated = insertMessageSchema.parse(data);
      await sendContactEmail(validated);

      // Keep local storage as a simple "inbox" history
      await new Promise((resolve) => setTimeout(resolve, 200));
      const messages = getStoredMessages();
      const newMessage: Message = {
        ...validated,
        id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
      };
      saveMessages([...messages, newMessage]);
      return newMessage;
    },
    list: async (): Promise<Message[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getStoredMessages();
    }
  }
};
