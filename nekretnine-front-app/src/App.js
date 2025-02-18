import './App.css';
import { BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
