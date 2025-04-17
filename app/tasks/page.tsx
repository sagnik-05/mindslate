"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import AddTaskModal from "@/components/AddTaskModal";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { LayoutList, ListChecks } from "lucide-react";
import { AnimatePresence } from "framer-motion";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [sortBy, setSortBy] = useState<"created_at" | "due_date" | "priority">("created_at");
  const router = useRouter();

  const fetchTasks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((t) => (activeTab === "pending" ? t.status !== "done" : t.status === "done"))
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      } else {
        return new Date(a[sortBy] || "").getTime() - new Date(b[sortBy] || "").getTime();
      }
    });

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
            <AddTaskModal onTaskCreated={fetchTasks} />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <Button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === "pending"
                  ? "bg-[#3ECF8E] text-black hover:bg-[#3ECF8E] hover:text-black"
                  : "bg-zinc-800 text-gray-300 hover:bg-[#3ECF8E] hover:text-black"
              }`}
            >
              <LayoutList className="inline" /> Pending
            </Button>
            <Button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === "completed"
                  ? "bg-[#3ECF8E] text-black hover:bg-[#3ECF8E] hover:text-black"
                  : "bg-zinc-800 text-gray-300 hover:bg-[#3ECF8E] hover:text-black"
              }`}
            >
              <ListChecks className="inline" /> Completed
            </Button>

            {/* Sort Dropdown */}
            <select
              className="bg-zinc-800 text-white px-3 py-2 rounded focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="created_at">Sort by Created</option>
              <option value="due_date">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          {/* Task list */}
          {loading ? (
            <p className="text-gray-400">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-400">No tasks.</p>
          ) : (
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <li key={task.id}>
                    <TaskCard task={task} onStatusToggle={fetchTasks} />
                  </li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
