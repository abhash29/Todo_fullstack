import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(){
    const result = await axios.post("http://127.0.0.1:8787/login", {
      username,
      password
    })
    console.log(result);
    const token = result.data.token;
    const id = result.data.userId;
    localStorage.setItem("token", token);
    setUsername("");
    setPassword("");

    navigate(`/component/${id}`)
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 p-6 rounded-xl shadow-md bg-white w-80">
        <div className="text-2xl font-bold text-center mb-4">
          Login
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="email"
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

          <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          onClick={handleLogin}
          >
            Login
          </button>
          <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
