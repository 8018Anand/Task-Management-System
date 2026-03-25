export default function TaskCard({ task, onDelete, onToggle }) {
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

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800">
      <h2 className="font-semibold text-lg dark:text-white">{task.title}</h2>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {task.description}
      </p>

      <div className="flex gap-2 mt-3 items-center flex-wrap">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[task.status] || "bg-gray-200 text-gray-800"}`}
        >
          {task.status}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${priorityColors[task.priority] || "bg-gray-200 text-gray-800"}`}
        >
          {task.priority}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 ${isOverdue ? "text-red-500 dark:text-red-400" : " text-black dark:text-white"}`}
        >
          Due:{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString('en-GB')
            : "No Date"}
        </span>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={() => onToggle(task)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Update
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
