
import "./style.css"
import Home from "./components/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/login" element={<Login/>} exact/>
        <Route path="/signup" element={<SignUp/>} exact/>
       </Routes>
      </Router>
    <Footer></Footer>
    </>
  );
}

export default App;
