import { useState, useEffect } from "react";

function Products() {
  const [Products, SetProducts] = useState([]);
  const [Nombre, SetNombre] = useState("");
  const [Modelo, SetModelo] = useState("");
  const [Precio, SetPrecio] = useState("");
  const [edit, Setedit] = useState(false);
  const [ID, SetID] = useState("");
  const [error, SetError] = useState(null);

  // CREAR O EDITAR PRODUCTO
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetError(null);

    try {
      let res, data;

      if (!edit) {
        res = await fetch("http://localhost:3000/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Nombre, Modelo, Precio }),
        });
      } else {
        res = await fetch(`http://localhost:3000/api/productos/${ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Nombre, Modelo, Precio }),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error desconocido");
      }

      data = await res.json();
      console.log(data);

      // Reiniciar formulario
      SetNombre("");
      SetModelo("");
      SetPrecio("");
      Setedit(false);
      SetID("");

      await getProducts();
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error");
    }
  };

  // VER PRODUCTOS
  const getProducts = async () => {
    SetError(null);
    try {
      const res = await fetch("http://localhost:3000/api/productos");
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      SetProducts(data);
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al cargar los productos");
    }
  };

  // ELIMINAR PRODUCTO
  const deleteProduct = async (ID) => {
    SetError(null);
    const confirm = window.confirm("¿Está seguro de eliminar el producto?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/productos/${ID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el producto");

      await res.json();
      await getProducts();
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al eliminar el producto");
    }
  };

  // EDITAR PRODUCTO
  const editProduct = async (ID) => {
    SetError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${ID}`);
      if (!res.ok) throw new Error("Error al obtener el producto");
      const data = await res.json();

      Setedit(true);
      SetID(ID);
      SetNombre(data.Nombre);
      SetModelo(data.Modelo);
      SetPrecio(data.Precio);
    } catch (err) {
      console.error(err);
      SetError(err.message || "Ocurrió un error al cargar el producto");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container m-4">
      <div className="row">
        {/* FORMULARIO */}
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
                placeholder="Nombre del Producto"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                onChange={(e) => SetModelo(e.target.value)}
                value={Modelo}
                className="form-control"
                placeholder="Modelo"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                onChange={(e) => SetPrecio(e.target.value)}
                value={Precio}
                className="form-control"
                placeholder="Precio"
              />
            </div>

            <button className="btn btn-outline-success btn-block">
              {edit ? "Editar" : "Crear"}
            </button>
          </form>
        </div>

        {/* TABLA */}
        <div className="col-md-8">
          <table
            className="table table-hover"
            style={{ border: "solid #e0e0e0 1px" }}
          >
            <thead>
              <tr className="table-dark" style={{ textAlign: "center" }}>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>Operaciones</th>
              </tr>
            </thead>

            <tbody>
              {Products.map((product) => (
                <tr
                  style={{ border: "solid #e0e0e0 1px" }}
                  key={product.ID}
                >
                  <td>{product.Nombre}</td>
                  <td>{product.Modelo}</td>
                  <td>{product.Precio}</td>

                  <td>
                    <button
                      onClick={() => editProduct(product.ID)}
                      className="btn btn-outline-dark border-0"
                      style={{ width: "100%" }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(product.ID)}
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
  );
}

export default Products
