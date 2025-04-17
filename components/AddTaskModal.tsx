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
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onTaskCreated: () => void;
}

export default function AddTaskModal({ onTaskCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("tasks").insert([
      {
        ...newTask,
        user_id: user.id,
        status: "pending",
      },
    ]);

    if (!error) {
      setOpen(false);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
      });
      onTaskCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border border-zinc-700 bg-[#3ECF8E] text-white hover:bg-[#8dfecb] hover:text-black"
        >
          <CirclePlus size={18} />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border border-zinc-800 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateTask} className="space-y-4 mt-4">
          <Input
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            className="text-white"
          />
          <Textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="text-white"
          />
          <div className="flex gap-4">
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="p-2 rounded bg-zinc-800 text-white border border-zinc-700 w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Input
              type="date"
              value={newTask.due_date}
              onChange={(e) =>
                setNewTask({ ...newTask, due_date: e.target.value })
              }
              className="text-white"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#3ECF8E] text-black hover:bg-[#34b87a] w-full"
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
