import { Link, useLocation } from "react-router-dom";

export function Navbar2() {
  const location = useLocation();
  const getTitle = () => {
    if (location.pathname === "/") return "Bienvenido";
    if (location.pathname === "/register") return "Registrate para acceder";
  };



  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        {}
        <Link className="navbar-brand" to="/">
          {getTitle()}
        </Link>
      </div>
    </nav>
  );
}