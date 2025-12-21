import { useRecoilState, useRecoilValue } from "recoil";
import { todoAtom, todoQuery } from "../store/atoms/atoms";
import { useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useMemo } from "react";
import axios from "axios";
import Details from "./Details";


function UpdatePage(){
    const {id} = useParams();
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");

    const navigate = useNavigate();

    const todos = useRecoilValue(todoQuery);
    const [, setTodos] = useRecoilState(todoAtom);


    const displayTodos = useMemo(() => {
      return todos.find(todo => todo._id===id);
    }, [todos, id]);

    useEffect(() => {
      if(displayTodos){
        setWork(displayTodos.work);
        setTime(displayTodos.time);
      }
    }, [displayTodos]);



    async function handleUpdate(id){
      try{
        const res =  await axios.put(`http://localhost:3000/todos/${id}`, {work, time});
        setTodos((prev) => prev.map((todo) => todo._id===id?res.data:todo));
        navigate("/component");
      }
      catch(error){
        console.log(error);
      }
      }

    if (!displayTodos) {
    // Show loading state until todo is ready
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

    
    
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Update Page
        </h1>

        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4">
          <input type="text" placeholder="Work" value={work} onChange={e => setWork(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <button onClick={() => handleUpdate(id)} className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors">Update</button>
        </div>


        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <Details work={displayTodos.work} time={displayTodos.time} />
        </div>

      </div>
    </div>
  );
}

export default UpdatePage;
