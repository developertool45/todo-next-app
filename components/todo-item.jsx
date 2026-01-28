
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';


const TodoItem = ({ todo }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const getPriorityColor =(priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200';
    }
  }
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        todo.completed && "opacity-75",
      )}
    >
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex align-top gap-2">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => {}}
            disabled={false}
            className={"mt-1"}
          />
          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                "text-lg font-semibold",
                todo.completed && "line-through text-muted-foreground",
              )}
            >
              {todo.title}
              <Badge className={cn(getPriorityColor(todo.priority), "mx-2")}>
                {todo.priority}
              </Badge>
            </h3>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                todo.completed && "line-through     text-muted-foreground",
              )}
            >
              {todo.description}
            </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-sm text-muted-foreground">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="text-sm text-muted-foreground">
              {new Date(todo.createdAt).toLocaleTimeString()}
            </span>
              </div>
          </div>
        </div>
        </div>
        <div className="flex items-center gap-2">          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {}}
            disabled={false}
          >
            <Trash2 size={16} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoItem