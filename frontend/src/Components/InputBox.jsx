import { useState } from "react";
import axios from "axios";


function InputBox(){
  const [work, setWork] = useState("");
  const [time, setTime] = useState("");

  async function handleSubmit(){
    const result = await axios.post("http://127.0.0.1:8787/todos", {
      work, time, user_id: 1
    })
    setWork("");
    setTime("");
    console.log(result);
  }

    return (
        <>
        <div className="flex items-center gap-3 border p-3 rounded-md">
        <input
          type="text"
          placeholder="Work"
          className="border px-2 py-1 rounded-md w-full"
          value={work}
          onChange={e => setWork(e.target.value)}
        />

        <input
          type="time"
          className="border px-2 py-1 rounded-md"
          value={time}
          onChange={e => setTime(e.target.value)}
        />

        <button
          className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="h-px bg-black my-3"></div>
        </>
    )
}
export default InputBox;