import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (carried over from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Early access signup model
export const earlyAccessSignups = pgTable("early_access_signups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  profession: text("profession").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for validating early access signups
export const earlyAccessSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  profession: z.string().min(1, { message: "Please select your profession" }),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms" })
}).strip(); // Strip out any extra fields

export const insertEarlyAccessSchema = createInsertSchema(earlyAccessSignups).omit({
  id: true,
  createdAt: true,
});

export type InsertEarlyAccessSignup = z.infer<typeof insertEarlyAccessSchema>;
export type EarlyAccessSignup = typeof earlyAccessSignups.$inferSelect;
