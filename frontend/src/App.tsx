import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App(){
  return(
    <div className="bg-[#EDD8B4]/10 min-h-screen">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/"             element={<Navigate to="/home" replace />} />
          <Route path="/home"         element={<div>Info Page<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />s</div>} />
          <Route path="/products"     element={<div>Products Page</div>} />
          <Route path="/workshops"    element={<div>Workshop Page</div>} />
          <Route path="/experiences"  element={<div>Experiences Page</div>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
