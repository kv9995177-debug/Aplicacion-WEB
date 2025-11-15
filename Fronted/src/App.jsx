import Users from "./components/Users";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedR from "./components/ProtectedR";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <Router>
      <Layout/>
        <Routes>
          
          <Route
            path="/users"
            element={
              <ProtectedR>
                <Users />
              </ProtectedR>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedR>
                <Products />
              </ProtectedR>
            }
          />
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      
    </Router>
  );
}

export default App;
