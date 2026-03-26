import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [totalPages, setTotalPages] = useState(1);
  const [analytics, setAnalytics] = useState(null);

  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 whenever a filter/sort changes, except when explicitly changing the page
    if (key !== "page") {
      newParams.set("page", "1");
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (searchTerm !== currentSearch) {
        handleParamChange("search", searchTerm);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        params: Object.fromEntries(searchParams.entries()),
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Token expired please login again");
        logout();
        navigate("/");
      } else {
        const errorMessage = err.response?.data?.message || "Failed to fetch tasks. Please try again.";
        toast.error(errorMessage);
        setTasks([]); // Clear tasks on error to avoid showing stale data
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/tasks/analytics");
      setAnalytics(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Your session has expired. Please login again.");
        logout();
        navigate("/");
      } else {
        const errorMessage = err.response?.data?.message || "Failed to load analytics data.";
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchAnalytics();
  }, [searchParams]);

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
      fetchAnalytics();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Token expired please login again");
        logout();
        navigate("/");
      } else {
        const errorMessage = err.response?.data?.message || "Failed to delete task. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 p-4">
        {/* Tasks Container */}
        <div className="md:w-2/3 lg:w-3/4 order-2 md:order-1">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h1 className="text-xl font-bold mb-4 md:mb-0 text-gray-800 dark:text-white">
              Your Tasks
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-green-400 hover:bg-green-500 transition text-white rounded-xl font-bold text-lg"
              >
                + Create Task
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <select
              value={searchParams.get("status") || ""}
              onChange={(e) => handleParamChange("status", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="dark:bg-gray-800">All Statuses</option>
              <option value="Todo" className="dark:bg-gray-800">Todo</option>
              <option value="Pending" className="dark:bg-gray-800">Pending</option>
              <option value="In Progress" className="dark:bg-gray-800">In Progress</option>
            </select>

            <select
              value={searchParams.get("priority") || ""}
              onChange={(e) => handleParamChange("priority", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="dark:bg-gray-800">All Priorities</option>
              <option value="Low" className="dark:bg-gray-800">Low</option>
              <option value="Medium" className="dark:bg-gray-800">Medium</option>
              <option value="High" className="dark:bg-gray-800">High</option>
            </select>

            <select
              value={searchParams.get("sortBy") || ""}
              onChange={(e) => handleParamChange("sortBy", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="dark:bg-gray-800">Sort By (None)</option>
              <option value="dueDate" className="dark:bg-gray-800">Due Date</option>
              <option value="priority" className="dark:bg-gray-800">Priority</option>
            </select>

            <select
              value={searchParams.get("sortOrder") || ""}
              onChange={(e) => handleParamChange("sortOrder", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="dark: bg-gray-800">Sort Order(None)</option>
              <option value="asc" className="dark:bg-gray-800">Ascending</option>
              <option value="desc" className="dark:bg-gray-800">Descending</option>
            </select>

            <select
              value={searchParams.get("limit") || "3"}
              onChange={(e) => handleParamChange("limit", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3" className="dark:bg-gray-800">3 per page</option>
              <option value="10" className="dark:bg-gray-800">10 per page</option>
              <option value="20" className="dark:bg-gray-800">20 per page</option>
              <option value="50" className="dark:bg-gray-800">50 per page</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-400 hover:bg-red-500 transition text-white rounded-lg font-medium outline-none focus:ring-2 focus:ring-red-500 ms-auto"
            >
              Reset Filters
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

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={Number(searchParams.get("page") || 1) <= 1}
                onClick={() => handleParamChange("page", Number(searchParams.get("page") || 1) - 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg disabled:opacity-50 transition"
              >
                Previous
              </button>
              <span className="text-gray-800 dark:text-gray-300 font-medium">
                Page {searchParams.get("page") || 1} of {totalPages}
              </span>
              <button
                disabled={Number(searchParams.get("page") || 1) >= totalPages}
                onClick={() => handleParamChange("page", Number(searchParams.get("page") || 1) + 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Analytics Container */}
        <div className="md:w-1/3 lg:w-1/4 order-1 md:order-2">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Analytics</h2>
            {analytics ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Summary</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span>Total Tasks</span>
                      <span className="font-bold text-gray-800 dark:text-white">{analytics.total || 0}</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span>Completed</span>
                      <span className="font-bold text-green-500 dark:text-green-400">{analytics.completed || 0}</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span>Pending</span>
                      <span className="font-bold text-yellow-500 dark:text-yellow-400">{analytics.pending || 0}</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Completion Rate</span>
                      <span className="font-bold text-blue-500 dark:text-blue-400">{analytics.completionRate || 0}%</span>
                    </li>
                  </ul>
                </div>
                
                {/* Progress Bar for Completion Rate */}
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-4">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${analytics.completionRate || 0}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading analytics...</p>
            )}
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isOpen}
        onClose={closeModel}
        task={selectedTask}
        refreshTasks={() => {
          fetchTasks();
          fetchAnalytics();
        }}
      />
    </div>
  );
}
