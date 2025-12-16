
import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'
import Details from './Details';

function App() {
  const [work, setWork] = useState("");
  const [time, setTime] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [done, setDone] = useState(false);
  const [displayWork, setDisplayWork] = useState("");
  const [displayTime, setDisplayTime] = useState("");

  const [componentId, setComponentId] = useState("");

  const [todos, setTodos] = useState([]);

  //handle mark
  async function handleMark(id){
    /*try{
      const res = await fetch(`http://localhost:3000/mark/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
      },
       body: JSON.stringify({
        mark: !done
      })
      })
      setDone(prev=>!prev);
    }
    catch(error){
      console.log(error);
    }*/
  }

  //re-rendering automatically
  useEffect(() => {
    const fetchTodos = async() => {
      const res = await axios.get('http://localhost:3000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, [refresh]);

  //Update
  async function handleUpdate(id){
    try{
      await axios.put(`http://localhost:3000/todos/${id}`, {
        work, time, mark,
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
      await axios.delete(`http://localhost:3000/todos/${id}`, {
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
      const res = await axios.get('http://localhost:3000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  //submit
  async function handleSubmit(){
    try{
      await axios.post("http://localhost:3000/todos", {
      work, time,
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

  //list only 1 todo
  useEffect(() => {
    if(!componentId) return;
    const fetchOneTodo = async() => {
      try{
        const res = await axios.get(`http://localhost:3000/todos/${componentId}`);
        setDisplayWork(res.data.work);
        setDisplayTime(res.data.time);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchOneTodo();
  }, [componentId])


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
    className="flex items-center justify-between gap-4 border border-gray-300 p-3 rounded-lg mb-2 shadow-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
    onClick={() => {setComponentId(todo._id); console.log("div is pressed", todo._id)}}
    >
    <div className="font-medium text-gray-800">{todo.work} at:</div>
    <div className="text-sm text-gray-600">{todo.time}</div>

    <button className="text-green-500 hover:text-white hover:bg-green-500 px-2 py-1 rounded transition-colors duration-300"
      onClick={(e) => {e.stopPropagation();  handleUpdate(todo._id)}}
    >
      Update
    </button>
    <button className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded transition-colors duration-300"
      onClick={(e) => {e.stopPropagation(); handleDelete(todo._id)}}
    >
      Delete
    </button>
    <label>
      <input type="checkbox" className='mr-2' value={done} /*onClick={handleMark(todo._id)}*/ />
        Mark as done
    </label>
  </div>
))}



  </div>

  {componentId && (
  <Details work={displayWork} time={displayTime} />
)}

</div>

  )
}

export default App
