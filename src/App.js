import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Venues from "./components/Venues";
import Bookings from "./components/Bookings";
import Register from "./components/Register";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/*" element={<Home />} /> add if necessary */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/venues" element={<Protected cmp={Venues} />} />
          <Route path="/bookings" element={<Protected cmp={Bookings} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
