import "./App.css";
import Navbar from "./components/Navbar.tsx";
import ProductList from "./pages/ProductList.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App(){
  return(
    <div className="bg-[#EDD8B4]/15 min-h-screen">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/"             element={<Navigate to="/home" replace />} />
          <Route path="/home"         element={<div>Info Page</div>} />
          <Route path="/products"     element={<ProductList/>} />
          <Route path="/workshops"    element={<div>Workshop Page</div>} />
          <Route path="/experiences"  element={<div>Experiences Page</div>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
