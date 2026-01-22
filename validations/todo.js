import { z } from "zod";

export const createTodoSchema = z.object({
    title:
        z
        .string()
            .min(1, "Title is required")
            .max(255, "Title is too long")
            .trim(),
            
    description:
        z
        .string()
            .min(1, "Description is required")
            .max(500, "Description is too long")
            .trim()
            .optional(),
    completed: z.boolean().default(false),
    priority: z.enum(["low", "medium", "high"]).default("medium")
});