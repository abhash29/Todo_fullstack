import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    async function handleSubmit(){
        const result = await axios.post("http://127.0.0.1:8787/signup", {
            username,
            password,
            firstName,
            lastName
        })
        console.log(result);
        const token = result.data.token;
        const id = result.data.userId;
        localStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");

        navigate(`/component/${id}`);
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 p-6 rounded-xl shadow-md bg-white w-80">
        <div className="text-2xl font-bold text-center mb-4">
          Signup
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
