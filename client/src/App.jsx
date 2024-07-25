import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestComponent from "./TestComponent";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/profile" element={<Profile/>}/>
          {/* <h1>Story Wonderland </h1>
          <TestComponent /> */}
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

