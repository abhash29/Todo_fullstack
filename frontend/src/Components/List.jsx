import { useState, useEffect } from "react";
import axios from "axios";
import Details from './Details';
import { useNavigate } from "react-router-dom";

function List(){
    //Get all the list
    const [todos, setTodo] = useState([]);
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect( () => {
      const fetchTodos = async() => {
      const result  = await axios.get('http://127.0.0.1:8787/todos/user/1');
      setTodo(result.data);
      console.log(result.data);
      }
      fetchTodos();
    }, []);

    //delete
    async function handleDelete(id){
      const result = await axios.delete(`http://127.0.0.1:8787/todos/${id}`);
      console.log("deleted ", id);
      setTodo(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    //single todo
     async function fetchSingleTodo(id){
      const result = await axios.get(`http://127.0.0.1:8787/todos/user/1/todo/${id}`)
      console.log(result.data);
      setWork(result.data.work);
      setTime(result.data.time);
      setStatus(result.data.status);
     }

    const navigate = useNavigate();

    // Update todo
    function handleUpdate(id){
      navigate(`/updatepage/${id}`);
    }

    //status update
    async function handleStatusUpdate(todoId, currentStatus) {
      const newStatus = !currentStatus;
      const result = await axios.put(`http://127.0.0.1:8787/todos/${todoId}`, {
        status: newStatus
      });

      setTodo(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, status: newStatus } : todo
        )
      );

      console.log(result);
    }

    return (
        <div className="border p-3 rounded-md text-center text-lg font-medium">
        <div>List</div>

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between gap-4 border border-gray-300 p-3 rounded-lg mb-2 shadow-sm hover:bg-gray-100 transition-colors"
            onClick={() =>  {fetchSingleTodo(todo.id); setClicked(true)} }
          >
            <div className="font-medium text-gray-800">{todo.work} at:</div>
            <div className="text-sm text-gray-600">{todo.time}</div>

            <button
              className="text-green-500 hover:text-white hover:bg-green-500 px-2 py-1 rounded"
              onClick={(e) => {e.stopPropagation();  handleUpdate(todo.id);}}>
              Update
            </button>

            <button
              className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
            >
              Delete
            </button>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleStatusUpdate(todo.id, todo.status)}
                />
                <span className="text-gray-800">{todo.status ? "Completed" : "Pending"}</span>
              </label>
            </div>
          </div>
        ))}
        {clicked?<Details work={work} time={time} status={status} />:<></>}
      </div>
    )
}
export default List;
