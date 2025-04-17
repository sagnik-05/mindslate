export function getDueDateClass(dueDate: string) {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = (due.getTime() - today.getTime()) / (1000 * 3600 * 24);
  
    if (isNaN(due.getTime())) return "text-gray-400";
    if (diff < 0) return "text-red-500"; // Overdue
    if (diff <= 2) return "text-yellow-400"; // Due soon
    return "text-green-400"; // Not urgent
  }
  