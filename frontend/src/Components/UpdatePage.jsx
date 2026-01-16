import { useNavigate, useParams } from "react-router-dom";
import Details from "./Details";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function UpdatePage() {
  const navigate = useNavigate();
  const { id, id2 } = useParams();

  const [work, setWork] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(false);

  const [work2, setWork2] = useState("");
  const [time2, setTime2] = useState("");

  const [loader, setLoader] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Fetch single todo
  useEffect(() => {
    const fetchSingleTodo = async () => {
      try {
        setLoader(true);

        const result = await axios.get(
          `http://127.0.0.1:8787/todos/user/${id}/todo/${id2}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWork(result.data.work);
        setTime(result.data.time);
        setStatus(result.data.status);

        // Prefill update inputs
        setWork2(result.data.work);
        setTime2(result.data.time);
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoader(false);
      }
    };

    if (id && id2) {
      fetchSingleTodo();
    }
  }, [id, id2, token]);

  // 🔹 Update todo
  const handleUpdate = async () => {
    try {
      setLoader(true);

      await axios.put(
        `http://127.0.0.1:8787/todos/${id2}`,
        {
          work: work2,
          time: time2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/component/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoader(false);
    }
  };

  // 🔹 Loader UI
  if (loader) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Update Page
        </h1>

        {/* Update Form */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4">
          <input
            type="text"
            placeholder="Work"
            value={work2}
            onChange={(e) => setWork2(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="time"
            value={time2}
            onChange={(e) => setTime2(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Update
          </button>
        </div>

        {/* Current Details */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <Details work={work} time={time} status={status} />
        </div>

      </div>
    </div>
  );
}

export default UpdatePage;
