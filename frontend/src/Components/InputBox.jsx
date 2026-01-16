import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InputBox({ setTodo }) {
  const [work, setWork] = useState("");
  const [time, setTime] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  async function handleSubmit() {
    try {
      // 1. Post new todo
      await axios.post(
        "http://127.0.0.1:8787/todos",
        { work, time, user_id: Number(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Refetch all todos
      const result = await axios.get(`http://127.0.0.1:8787/todos/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 3. Update parent state
      setTodo(result.data);

      // 4. Clear inputs
      setWork("");
      setTime("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  }

  return (
    <div className="flex items-center gap-3 border p-3 rounded-md mb-3">
      <input
        type="text"
        placeholder="Work"
        className="border px-2 py-1 rounded-md w-full"
        value={work}
        onChange={(e) => setWork(e.target.value)}
      />

      <input
        type="time"
        className="border px-2 py-1 rounded-md"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default InputBox;
