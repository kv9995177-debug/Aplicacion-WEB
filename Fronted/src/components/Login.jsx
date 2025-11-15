import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar2 } from "./Navbar2";

function Login() {
  const [Usuario, SetUsuario] = useState("");
  const [Contraseña, SetContra] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null); // limpiar error al intentar login

    try {
      const res = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Usuario, Contraseña }),
      });

      const data = await res.json();

      
      if (!res.ok) {
        setErrorMsg(data.error || "Error desconocido");
        return;
      }

      
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch (err) {
      console.error("Error en fetch:", err);
      setErrorMsg("Error de conexión con el servidor");
    }
  };

  return (
<>
    <Navbar2/>
    <div
  className="col-md-4 mx-auto"
  style={{ position: "relative", marginTop: "5rem" }}
>
  {/* 🔴 ALERTA DE ERROR SOBRE EL LOGIN */}
  {errorMsg && (
    <div
      className="alert alert-danger text-center fw-bold shadow"
      style={{
        position: "absolute",
        top: "-70px",
        left: 0,
        right: 0
      }}
    >
      {errorMsg}
    </div>
  )}

  <div className="card shadow-lg">
    <div className="card-header text-center">
      <h4>Acceder</h4>
    </div>

    <form className="card-body">
      <div className="form-group mb-3">
        <label className="form-label">Usuario:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese su usuario"
          onChange={(e) => SetUsuario(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Contraseña:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Ingrese su contraseña"
          onChange={(e) => SetContra(e.target.value)}
        />
      </div>

      {/* Botón principal → usa el color primario del tema Bootswatch */}
      <button
        onClick={handleLogin}
        className="btn btn-primary w-100 mt-2 "
      >
        Iniciar Sesión
      </button>

      {/* Botón secundario → outline por defecto */}
      <button className="btn btn-outline-primary w-100 mt-2"
      onClick={(e) => {
        e.preventDefault()
        navigate('/register')

      }}
      >
        Registrarme
      </button>
    </form>
  </div>
</div>
</>
  );
}

export default Login;
