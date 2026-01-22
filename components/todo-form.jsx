"use client";

import React, { use } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { createTodoSchema } from "@/validations/todo";
import { useCreateTodo } from "@/hooks/use-create-todo";

const TodoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);
      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error || "Something went wrong while creating todo");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating todo");
    }
  };
  if (!isOpen) {
    return (
      <div>
        <Button
          onClick={() => setIsOpen(true)}
          className={"w-full mb-6"}
          size="lg"
        >
          Add New Todo
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...form.register("title")}
                id="title"
                placeholder="Enter todo title..."
              />
              {form.formState.errors.title && (
                <span className="text-red-500">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...form.register("description")}
                id="description"
                placeholder="Enter todo description..."
              />
            </div>
            {form.formState.errors.description && (
              <span className="text-red-500">
                {form.formState.errors.description.message}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) => {
                  form.setValue("priority", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={createTodoMutation.isLoading}>
              {createTodoMutation.isLoading ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsOpen(false);
                form.reset();
              }}
              variant="outline"
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
