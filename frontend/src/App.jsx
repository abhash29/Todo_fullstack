import Component from "./Components/Component";
import Login from "./Components/Login";
import UpdatePage from "./Components/UpdatePage";
import './app.css';
import {Route, Routes} from "react-router-dom";
import { RecoilRoot } from "recoil";


function App() {
  return (
    <RecoilRoot>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/component" element={<Component />} />
      <Route path="/updatepage/:id" element={<UpdatePage />} />
    </Routes>
    </RecoilRoot>
  );
}
export default App;