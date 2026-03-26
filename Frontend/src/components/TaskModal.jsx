import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function TaskModal({ isOpen, onClose, task, refreshTasks }) {
  const isEdit = Boolean(task);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Low",
    dueDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // 🔁 Prefill when editing
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Todo",
        priority: task.priority || "Low",
        dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
      });
    } else {
      // reset for create
      setForm({
        title: "",
        description: "",
        status: "Todo",
        priority: "Low",
        dueDate: "",
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required.");
      return;
    }

    setSubmitting(true);

    try {
      if (isEdit) {
        await API.put(`/tasks/${task._id}`, form);
        toast.success("Task updated successfully!");
      } else {
        await API.post("/tasks", form);
        toast.success("Task created successfully!");
      }

      refreshTasks();
      onClose();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Token expired please login again");
        logout();
        navigate("/");
      } else {
        const errorMessage =
          err.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 dark:text-white">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
          />

          {/* Status */}
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-2 border rounded bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          {/* Priority */}
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full p-2 border rounded bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full p-2 border rounded"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Cancel
            </button>

            <button
              disabled={submitting}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {submitting ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update" : "Create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
