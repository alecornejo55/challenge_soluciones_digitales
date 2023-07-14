import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getClientes } from "../helpers";
import { getClientesByDni } from "../helpers/getClientesByDni";
// import { getClientes } from "../helpers";

export const ClientesPage = () => {
  const navigate = useNavigate();
  const onNuevoCliente = () => {
    navigate("/nuevo", {
      replace: true,
    });
  };

  const [clientes, setClientes] = useState([]);

  const searchClientes = async () => {
    const clientes = await getClientes();
    setClientes(clientes);
  };

  // cargando clientes
  useEffect(() => {
    searchClientes();
  }, []);

  // filtro por dni
  const [dni, setDni] = useState("");
  const onFilter = async (e) => {
    e.preventDefault();
    if (dni.length > 0) {
      const clientes = await getClientesByDni(dni);
      setClientes(clientes);
    }
  };

  // Reset del filtro
  const onResetFilter = async () => {
    await searchClientes();
    setDni("");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="d-flex align-items-center justify-content-between">
            Listado de clientes
            <button className="btn btn-primary" onClick={onNuevoCliente}>
              <i className="bi bi-person-fill-add"></i>
              <span className="ms-2">Nuevo cliente</span>
            </button>
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Filtros
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form className="row g-1" onSubmit={onFilter}>
                    <div className="col-6">
                      <label htmlFor="dni" className="form-label">
                        Dni
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="dni"
                        maxLength={30}
                        onChange={(e) => setDni(e.target.value)}
                        value={dni}
                        placeholder="Número de documento"
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button className="btn btn-outline-primary" type="submit">
                        Buscar
                      </button>
                      <button
                        className="btn btn-secondary ms-3"
                        type="button"
                        onClick={onResetFilter}
                      >
                        Reestablecer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Dni</th>
                <th scope="col">Sexo</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <th scope="row">{cliente.id}</th>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.dni}</td>
                  <td>{cliente.sexoTipo.nombre}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <NavLink to={`editar/${cliente.id}`}>Editar</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
