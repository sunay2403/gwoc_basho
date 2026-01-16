import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import BashoHomepage from "./pages/InfoPage";
import WorkshopsPage from "./pages/Workshops";
import ExperiencesPage from "./pages/Experiences";
import BashoMediaSocialProof from "./pages/SocialMedia";
import StudioPage from "./pages/Studio";
import CorporatePage from "./pages/Corporate";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";
import RazorpayCheckout from "./pages/RazorpayCheckout";
import ExperienceRegistration from "./pages/ExperienceRegistrationForm";
import OrderConfirmation from "./pages/OrderConfirmation";
import ThankYou from "./pages/Thankyou";
import CustomOrder from "./pages/CustomOrder";
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
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/workshops" element={<ProtectedRoute><WorkshopsPage/></ProtectedRoute>} />
          <Route path="/experiences" element={<ExperiencesPage/>} />
          <Route path="/media" element={<BashoMediaSocialProof/>}/>
          <Route path="/studio" element={<StudioPage/>}/>
          <Route path="/corporate" element={<CorporatePage />} />          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/payment" element={<RazorpayCheckout/>}/>
          <Route path="/register" element={<ExperienceRegistration />} />
          <Route path="/confirm-order" element={<OrderConfirmation />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/custom-order" element={<CustomOrder />} />



          

          {/* Optional: 404 fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
