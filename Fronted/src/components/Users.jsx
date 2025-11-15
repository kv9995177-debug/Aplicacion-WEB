import React, { useState, useEffect } from "react";
import "../estiloesp.css";

function Users() {
  const [Users, SetUsers] = useState([]);
  const [Nombre, SetNombre] = useState("");
  const [Correo, SetCorreo] = useState("");
  const [Puesto, SetPuesto] = useState("");
  const [edit, Setedit] = useState(false);
  const [ID, SetID] = useState("");
  const [error, SetError] = useState(null); // Estado para errores

  // CREAR O EDITAR USUARIO
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetError(null);

    try {
      let res, data;

      if (!edit) {
        res = await fetch("http://localhost:3000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Nombre, Correo, Puesto }),
        });
      } else {
        res = await fetch(`http://localhost:3000/api/usuarios/${ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Nombre, Correo, Puesto }),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error desconocido");
      }

      data = await res.json();
      console.log(data);

      // Reiniciar formulario y estado edición
      SetNombre("");
      SetCorreo("");
      SetPuesto("");
      Setedit(false);
      SetID("");

      await getUsers();
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error");
    }
  };

  // VER USUARIOS
  const getUsers = async () => {
    SetError(null);
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      SetUsers(data);
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al cargar usuarios");
    }
  };

  // ELIMINAR USUARIO
  const deleteUser = async (ID) => {
    SetError(null);
    const confirm = window.confirm("¿Está seguro de eliminar el usuario?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${ID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el usuario");
      await res.json();
      await getUsers();
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al eliminar el usuario");
    }
  };

  // EDITAR USUARIO
  const editUser = async (ID) => {
    SetError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${ID}`);
      if (!res.ok) throw new Error("Error al obtener el usuario");
      const data = await res.json();

      Setedit(true);
      SetID(ID);
      SetNombre(data.Nombre);
      SetCorreo(data.Correo);
      SetPuesto(data.Puesto);
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al cargar el usuario");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      

      <div className="container m-4">
        <div className="row">
          <div className="col-md-4">
            <form
              onSubmit={handleSubmit}
              className="card card-body"
              style={{ gap: "15px", border: "solid #e0e0e0 1px" }}
            >
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  onChange={(e) => SetNombre(e.target.value)}
                  value={Nombre}
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  onChange={(e) => SetCorreo(e.target.value)}
                  value={Correo}
                  className="form-control"
                  placeholder="Correo"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  onChange={(e) => SetPuesto(e.target.value)}
                  value={Puesto}
                  className="form-control"
                  placeholder="Puesto"
                />
              </div>
              <button className="btn btn-outline-success btn-block">
                {edit ? "Editar" : "Crear"}
              </button>
            </form>
          </div>
          <div className="col-md-8">
            <table
              className="table table-hover"
              style={{ border: "solid #e0e0e0 1px" }}
            >
              <thead>
                <tr className="table-dark" style={{textAlign: "center"}}>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Puesto</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {Users.map((user) => (
                  <tr style={{ border: "solid #e0e0e0 1px", textAlign: "center" }} key={user.ID}>
                    <td>{user.Nombre}</td>
                    <td>{user.Correo}</td>
                    <td>{user.Puesto}</td>
                    <td>
                      <button
                        onClick={() => editUser(user.ID)}
                        className="btn btn-outline-dark border-0"
                        style={{ width: "100%" }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUser(user.ID)}
                        className="btn btn-outline-danger border-0"
                        style={{ width: "100%" }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
