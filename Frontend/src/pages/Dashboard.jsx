import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch tasks. Please try again.";
      toast.error(errorMessage);
      setTasks([]); // Clear tasks on error to avoid showing stale data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsOpen(true);
  };

  const closeModel = () => {
    setSelectedTask(null);
    setIsOpen(false);
  };


  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete task. Please try again.";
      toast.error(errorMessage);
    }
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: "Done",
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Your Tasks
          </h1>

          <button
            onClick={handleCreate}
            className="mb-4 px-4 py-2 bg-green-400 text-white rounded-xl font-bold text-lg"
          >
            + Create Task
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : tasks.length > 0 ? (
          <div className="grid gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No tasks found. Click &quot;+ Create Task&quot; to get started!</p>
          </div>
        )}
      </div>
      <TaskModal
        isOpen={isOpen}
        onClose={closeModel}
        task={selectedTask}
        refreshTasks={fetchTasks}
      />
    </div>
  );
}
