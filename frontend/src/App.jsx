
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [work, setWork] = useState("");
  const [time, setTime] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [work2, setWork2] = useState("");
  const [time2, setTime2] = useState("");

  const [todos, setTodos] = useState([]);

  //re-rendering automatically
  useEffect(() => {
    const fetchTodos = async() => {
      const res = await fetch('http://localhost:3000/todos');
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, [refresh]);

  //Update
  async function handleUpdate(id){
    try{
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "Put",
        headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({work, time}),
      })
      setWork("");
      setTime("");
      setRefresh(!refresh);
    }
    catch(error){
      console.log(error);
    }
  }

  //Delete
  async function handleDelete(id){
    try{
      await fetch(`http://localhost:3000/todos/${id}`, {
      method: "Delete",
    })
    setRefresh(!refresh);
  }
  catch(error){
    console.log(error);
  }
  }

  //Fetch the list
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:3000/todos');
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  //submit
  async function handleSubmit(){
    try{
      await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({work, time})
    })
    }
    catch(error){
      console.log(error);
    }

    setWork("");
    setTime("");
    setRefresh(!refresh);
  }

  function handleChange(e){
    setWork(e.target.value);
  }
  function handleChange2(e){
    setTime(e.target.value);
  }
  return (
    <div className="h-auto w-auto border-4 border-black bg-white p-4 rounded-lg shadow-md">
  <div className="text-4xl font-bold text-center mb-2">
    Todo App
  </div>

  <div className="h-px bg-black my-3"></div>

  <div className="flex items-center gap-3 border p-3 rounded-md">
    <input
      type="text"
      placeholder="Work"
      className="border px-2 py-1 rounded-md w-full"
      value={work}
      onChange={handleChange}
    />

    <input
      type="time"
      className="border px-2 py-1 rounded-md"
      value={time}
      onChange={handleChange2}
    />

    <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
    onClick={handleSubmit}
    >
      Submit
    </button>
  </div>

  <div className="h-px bg-black my-3"></div>

  <div className="border p-3 rounded-md text-center text-lg font-medium">
    <div>List</div>
   {todos.map((todo) => (
  <div
    key={todo._id}
    className="flex items-center justify-between gap-4 border border-gray-300 p-3 rounded-lg mb-2 
               shadow-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
  >
    <div className="font-medium text-gray-800">{todo.work} at:</div>
    <div className="text-sm text-gray-600">{todo.time}</div>
    <button className="text-green-500 hover:text-white hover:bg-green-500 px-2 py-1 rounded transition-colors duration-300"
      onClick={() => handleUpdate(todo._id)}
    >
      Update
    </button>
    <button className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded transition-colors duration-300"
      onClick={() => handleDelete(todo._id)}
    >
      Delete
    </button>
  </div>
))}


  </div>
</div>

  )
}

export default App
