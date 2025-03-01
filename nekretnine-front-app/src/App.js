import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import AboutUs from "./pages/about-us/AboutUs";
import OurProperties from "./pages/our-properties/OurProperties";
import PropertyDetails from "./pages/property-details/PropertyDetails";
import WorldMap from "./pages/world-map/WorldMap";
import OurTeam from "./pages/our-team/OurTeam";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="main-content"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-properties" element={<OurProperties />} />
            <Route path="/our-properties/:id" element={<PropertyDetails />} />
            <Route path="/world-map" element={<WorldMap />} />
            <Route path="/our-team" element={<OurTeam />} />    
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
