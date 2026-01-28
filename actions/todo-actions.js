"use server";
import connectDB from "@/lib/db";
import Todo from "@/model/todo";
import { revalidatePath } from "next/cache";
import { createTodoSchema } from "@/validations/todo";

export async function createtodo(data) {
    try {
        const validatedData = createTodoSchema.parse(data);
        await connectDB();
        const todo = await Todo.create(validatedData);
        revalidatePath("/");
        return {
            success: true,
            data:JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message || "Something went wrong while creating todo",
        }
    }
}

export async function getTodos() {
    try {
        await connectDB();
        const todos = await Todo.find().sort({ createdAt: -1 }).lean();
        return {
            success: true,
            data:JSON.parse(JSON.stringify(todos))
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message || "Something went wrong while fetching todos",
        }
    }
}

