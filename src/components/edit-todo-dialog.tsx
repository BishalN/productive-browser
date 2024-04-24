import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PencilIcon } from "lucide-react";
import { ITodo } from "../interfaces";
import { watch } from "../utils/shared-utils";
import { StorageKey } from "../consts";
import { Checkbox } from "./ui/checkbox";

export function EditTodoDialog({
  completed,
  text,
  timestamp,
  updatedAt,
  uuid,
}: ITodo) {
  const [todo, setTodo] = React.useState<ITodo>({
    completed,
    text,
    timestamp,
    updatedAt,
    uuid,
  });
  const [todos, setTodos] = React.useState<ITodo[]>([]);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    watch(StorageKey.TODOS, ({ newValue = [] }) => {
      setTodos(newValue);
    });
  }, []);

  async function updateTodo() {
    const updatedTodos = todos.map((t) => {
      if (t.uuid === todo.uuid) {
        return todo;
      }
      return t;
    });

    await chrome.storage.local.set({ [StorageKey.TODOS]: updatedTodos });

    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="space-x-2">
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 flex w-full flex-col items-center justify-center space-x-2">
          <div className="w-full">
            <Label className="text-left" htmlFor="task">
              Task
            </Label>
            <Input
              id="task"
              type="text"
              value={todo.text}
              onChange={(e) => setTodo({ ...todo, text: e.target.value })}
            />
          </div>

          <div className="w-full flex items-center space-x-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(e) =>
                setTodo({ ...todo, completed: !!e.valueOf() })
              }
              id="completed"
            />
            <label
              htmlFor="completed"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Task completed
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={updateTodo} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
