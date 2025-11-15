import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const location = useLocation();

  // rutas donde NO se debe mostrar el navbar
  const hiddenRoutes = ["/", "/register"];

  const hideNavbar = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default Layout;