import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Stories from "./pages/Stories";
import SignOut from "./pages/SignOut";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-out" element={<SignOut/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/stories" element={<Stories/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

