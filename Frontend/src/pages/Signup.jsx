import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await API.post("/auth/signup", form);
      toast.success("Signup successful, please login");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Signup
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded dark:border-white dark:text-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded dark:border-white dark:text-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
