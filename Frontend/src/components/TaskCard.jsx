import { useState, useRef, useEffect } from "react";

export default function TaskCard({ task, onDelete, onToggle }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const statusColors = {
    "Todo": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Done": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  const priorityColors = {
    "Low": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "High": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  // Check if the task is overdue
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of today for accurate date comparison
  const isOverdue = task.dueDate && new Date(task.dueDate) < today;

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={() => setIsExpanded(true)}
      className={`p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800 flex justify-between items-start flex-wrap cursor-pointer transition-all w-full overflow-hidden ${isExpanded ? "ring-2 ring-blue-400" : "hover:shadow-md"}`}
    >
      {/* LEFT SIDE */}
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-lg dark:text-white break-words">{task.title}</h2>

        <p className={`text-sm text-gray-500 dark:text-gray-400 ${isExpanded ? "whitespace-pre-wrap break-words" : "truncate"}`}>
          {task.description}
        </p>

        <div className="flex gap-2 mt-3 items-center flex-wrap">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              statusColors[task.status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {task.status}
          </span>

          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              priorityColors[task.priority] || "bg-gray-200 text-gray-800"
            }`}
          >
            {task.priority}
          </span>

          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 ${
              isOverdue
                ? "text-red-500 dark:text-red-400"
                : "text-black dark:text-white"
            }`}
          >
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-GB")
              : "No Date"}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE (Buttons) */}
      <div className="flex mt-2 md:mt-0 gap-2 md:ml-4 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Update
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
