import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  annualFee: integer("annual_fee").notNull(),
  category: text("category").notNull(),
  description: text("description"),
});

export const voiceCallLogs = pgTable("voice_call_logs", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  transcript: text("transcript"),
  duration: integer("duration"),
  coursesDiscussed: text("courses_discussed").array(),
  scholarshipCalculated: boolean("scholarship_calculated").default(false),
  timestamp: text("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses);
export const insertVoiceCallLogSchema = createInsertSchema(voiceCallLogs);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type VoiceCallLog = typeof voiceCallLogs.$inferSelect;
export type InsertVoiceCallLog = z.infer<typeof insertVoiceCallLogSchema>;
