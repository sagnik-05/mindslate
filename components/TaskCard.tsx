"use client";

import { supabase } from "@/lib/supabase";
import EditTaskModal from "./EditTaskModal";
import { motion } from "framer-motion";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
};

interface Props {
  task: Task;
  onStatusToggle: () => void;
}

const priorityColors = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-red-400",
};

function getDueDateStyle(date: string) {
  if (!date) return "text-gray-400";
  const today = new Date().toISOString().split("T")[0];
  if (date < today) return "text-red-500";
  if (date === today) return "text-yellow-400";
  return "text-gray-400";
}

export default function TaskCard({ task, onStatusToggle }: Props) {
  const toggleStatus = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({
        status: task.status === "done" ? "pending" : "done",
      })
      .eq("id", task.id);

    if (!error) onStatusToggle();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all h-[200px] flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h2
            className={`text-lg font-semibold ${
              task.status === "done"
                ? "line-through text-gray-400"
                : "text-[#3ECF8E]"
            }`}
          >
            {task.title}
          </h2>
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={toggleStatus}
            className="w-5 h-5 accent-[#3ECF8E]"
            title="Mark as done"
          />
          <EditTaskModal task={task} onTaskUpdated={onStatusToggle} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span className={getDueDateStyle(task.due_date)}>
          Due: {task.due_date || "No due date"}
        </span>
        <span className={priorityColors[task.priority as keyof typeof priorityColors]}>
          Priority: {task.priority}
        </span>
      </div>
    </motion.div>
  );
}
