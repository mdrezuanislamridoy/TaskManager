import { useState, useEffect } from "react";
import axios from "axios";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/todos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      setMessage("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/todos",
        { title, description, date, completed: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
      setDate("");
      setMessage("Task added successfully!");
    } catch (error) {
      console.log("Failed to add task:", error);
      setMessage("Failed to add task. Please try again.");
    }
  };

  const handleCheckboxChange = async (taskId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(
        `http://localhost:3003/api/todos/${taskId}`,
        { completed: updatedStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedStatus } : task
        )
      );
      setMessage("Task status updated successfully!");
    } catch (error) {
      console.error("Failed to update task:", error);
      setMessage("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>

      {message && (
        <p className="mb-4 text-sm text-center text-red-500 font-semibold">
          {message}
        </p>
      )}

      <form
        onSubmit={handleAddTask}
        className="w-full max-w-lg bg-white shadow-md rounded p-6 mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter task description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Task Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="w-full max-w-lg bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
          {tasks.map((task) => (
            <label
              key={task._id}
              className="flex items-center mb-4 p-4 border-b border-gray-300 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(task._id, task.completed)}
                className="mr-4 h-5 w-5 text-blue-600"
                checked={task.completed}
                disabled={task.completed}
              />
              <div>
                <h3
                  className={`text-xl font-bold ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(task.date).toLocaleDateString()}
                </p>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToDo;
