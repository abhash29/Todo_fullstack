import { useState, useEffect } from "react";
import axios from "axios";
import Details from './Details';
import { useRecoilState, useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { todoAtom, todoQuery } from "../store/atoms/atoms";
import { useNavigate } from "react-router-dom";

function List(){

    //Atoms
    const todos = useRecoilValue(todoQuery);
    const [, setTodos] = useRecoilState(todoAtom);
    const [componentId, setComponentId] = useState("");
    //const refreshTodos = useRecoilRefresher_UNSTABLE(todoQuery);

    const navigate = useNavigate();


    //// Delete todo
      async function handleDelete(id) {
        try {
          await axios.delete(`http://localhost:3000/todos/${id}`);
          setTodos(prev => prev.filter(todo => todo._id!==id));
          //refreshTodos();
        } catch (error) {
          console.log(error);
        }
      }

    // Fetch single todo
    const displayTodo = todos.find(todo => todo._id===componentId);

    // Update todo
    function handleUpdate(id){
      navigate(`/updatepage/${id}`);
    }
    

    return (
        <div className="border p-3 rounded-md text-center text-lg font-medium">
        <div>List</div>

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between gap-4 border border-gray-300 p-3 rounded-lg mb-2 shadow-sm hover:bg-gray-100 transition-colors"
            onClick={() => setComponentId(todo._id)}
          >
            <div className="font-medium text-gray-800">{todo.work} at:</div>
            <div className="text-sm text-gray-600">{todo.time}</div>

            <button
              className="text-green-500 hover:text-white hover:bg-green-500 px-2 py-1 rounded"
              onClick={(e) => {e.stopPropagation();  handleUpdate(todo._id);}}>
              Update
            </button>

            <button
              className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo._id);
              }}
            >
              Delete
            </button>

            <label>
              <input
                type="checkbox"
                className="mr-2"
              />
              Mark as done
            </label>
          </div>
        ))}

         {componentId && (
        <Details work={displayTodo.work} time={displayTodo.time} />
      )}
      </div>
    )
}
export default List;