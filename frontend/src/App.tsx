import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import BashoHomepage from "./pages/InfoPage";
import WorkshopsPage from "./pages/Workshops";
import ExperiencesPage from "./pages/Experiences";
import StudioPage from "./pages/Studio";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="bg-[#EDD8B4]/15 min-h-screen">
      <BrowserRouter>
        <Navbar />
        

        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Main Pages */}
          <Route path="/home" element={<BashoHomepage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/workshops" element={<WorkshopsPage/>} />
          <Route path="/experiences" element={<ExperiencesPage/>} />
          <Route path="/studio" element={<StudioPage />} />

          {/* Optional: 404 fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
