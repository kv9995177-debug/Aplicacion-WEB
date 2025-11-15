import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const getTitle = () => {
    if (location.pathname === "/users") return "Gestión de empleados";
    if (location.pathname === "/products") return "Gestión de productos";
  };



  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        {}
        <Link className="navbar-brand" to="/">
          {getTitle()}
        </Link>

        
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Empleados
              </Link>
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
