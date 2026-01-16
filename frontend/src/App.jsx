import Component from "./Components/Component";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UpdatePage from "./Components/UpdatePage";
import './app.css';
import {Route, Routes} from "react-router-dom";


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/component/:id" element={<Component />} />
      <Route path="/updatepage/:id/:id2" element={<UpdatePage />} />
      <Route path="*" element={<Error />} />
    </Routes>
   
  );
}
export default App;