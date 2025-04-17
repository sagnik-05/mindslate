"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  due_date: string;
};

interface Props {
  task: Task;
  onTaskUpdated: () => void;
}

export default function EditTaskModal({ task, onTaskUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    due_date: task.due_date,
  });

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", task.id);

    if (!error) {
      setOpen(false);
      onTaskUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#3ECF8E]">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateTask} className="space-y-4 mt-4">
          <Input
            placeholder="Title"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            required
            className="text-white"
          />
          <Textarea
            placeholder="Description"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="text-white"
          />
          <div className="flex gap-4">
            <select
              value={updatedTask.priority}
              onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
              className="p-2 rounded bg-zinc-800 text-white border border-zinc-700 w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Input
              type="date"
              value={updatedTask.due_date}
              onChange={(e) => setUpdatedTask({ ...updatedTask, due_date: e.target.value })}
              className="text-white"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#3ECF8E] text-black hover:bg-[#34b87a] w-full"
          >
            Update Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
