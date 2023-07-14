import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCliente,
  getClienteById,
  getSexoTipos,
  patchCliente,
} from "../helpers";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export const EditarClientePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onVolver = () => {
    navigate("/", {
      replace: true,
    });
  };

  // buscar sexo tipos
  const [sexoTiposIds, setSexoTiposIds] = useState([]);

  const getTipos = async () => {
    const tipos = await getSexoTipos();
    setSexoTiposIds(tipos);
  };

  // buscar datos del cliente
  const [cliente, setCliente] = useState([]);
  const searchCliente = async () => {
    const cliente = await getClienteById(id);
    console.log(cliente);
    if (!cliente) {
      onVolver();
    }
    setCliente(cliente);
    setValue("nombre", cliente.nombre);
    setValue("apellido", cliente.apellido);
    setValue("dni", cliente.dni);
    setValue("tipo_sexo_id", cliente.tipo_sexo_id);
    setValue("telefono", cliente.telefono);
  };
  // cargando tipos de sexo
  useEffect(() => {
    getTipos();
    searchCliente();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const MySwal = withReactContent(Swal);
  // validación formulario
  const onSubmit = async (data) => {
    const { success, message } = await patchCliente(cliente.id, data);
    MySwal.fire({
      title: (
        <strong>{success ? `Operación exitosa!` : "Operación errónea"}</strong>
      ),
      text: message,
      icon: success ? "success" : "error",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (success && (result.isDismissed || result.isConfirmed)) {
        onVolver();
      }
    });
  };

  // Eliminar cliente
  const onDelete = async () => {
    const result = await MySwal.fire({
      title: "Estás seguro?",
      text: "El elemento eliminado no podrá recuperarse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      const { success, message } = await deleteCliente(cliente.id);
      MySwal.fire({
        title: (
          <strong>
            {success ? `Operación exitosa!` : "Operación errónea"}
          </strong>
        ),
        text: message,
        icon: success ? "success" : "error",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (success && (result.isDismissed || result.isConfirmed)) {
          onVolver();
        }
      });
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="d-flex align-items-center justify-content-center">
            Editar cliente
          </h1>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">Datos del cliente</div>
            <div className="card-body">
              <form
                action=""
                className="row g-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.nombre ? "border-danger" : ""
                    }`}
                    id="nombre"
                    maxLength={30}
                    {...register("nombre", { required: true, maxLength: 30 })}
                  />
                  <p
                    className={`p-0 m-0 small text-danger ${
                      !errors.nombre ? "d-none" : ""
                    }`}
                  >
                    - campo obligatorio
                  </p>
                </div>
                <div className="col-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.apellido ? "border-danger" : ""
                    }`}
                    id="apellido"
                    maxLength={30}
                    {...register("apellido", { required: true })}
                  />
                  <p
                    className={`p-0 m-0 small text-danger ${
                      !errors.apellido ? "d-none" : ""
                    }`}
                  >
                    - campo obligatorio
                  </p>
                </div>
                <div className="col-6">
                  <label htmlFor="dni" className="form-label">
                    DNI <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.dni ? "border-danger" : ""
                    }`}
                    id="dni"
                    maxLength={8}
                    {...register("dni", {
                      required: true,
                      pattern: /^[0-9]+$/i,
                    })}
                  />
                  <p
                    className={`p-0 m-0 small text-danger ${
                      errors.dni?.type == "required" ? "" : "d-none"
                    }`}
                  >
                    - campo obligatorio
                  </p>
                  <p
                    className={`p-0 m-0 small text-danger ${
                      errors.dni?.type == "pattern" ? "" : "d-none"
                    }`}
                  >
                    - solo se admiten números
                  </p>
                </div>
                <div className="col-6">
                  <label htmlFor="tipo_sexo_id" className="form-label">
                    Sexo <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.tipo_sexo_id ? "border-danger" : ""
                    }`}
                    id="tipo_sexo_id"
                    defaultValue={""}
                    {...register("tipo_sexo_id", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  >
                    <option value="" disabled>
                      Seleccione...
                    </option>
                    {sexoTiposIds.map((option) => (
                      <option value={option.id} key={`tipo_sexo_${option.id}`}>
                        {option.nombre}
                      </option>
                    ))}
                  </select>
                  <p
                    className={`p-0 m-0 small text-danger ${
                      !errors.tipo_sexo_id ? "d-none" : ""
                    }`}
                  >
                    - campo obligatorio
                  </p>
                </div>
                <div className="col-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.telefono ? "border-danger" : ""
                    }`}
                    id="telefono"
                    maxLength={14}
                    {...register("telefono", {
                      required: true,
                      pattern: /^[0-9]+$/i,
                    })}
                  />
                  <p
                    className={`p-0 m-0 small text-danger ${
                      errors.telefono?.type == "required" ? "" : "d-none"
                    }`}
                  >
                    - campo obligatorio
                  </p>
                  <p
                    className={`p-0 m-0 small text-danger ${
                      errors.telefono?.type == "pattern" ? "" : "d-none"
                    }`}
                  >
                    - solo se admiten números
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="btn btn-danger me-auto"
                    type="button"
                    onClick={onDelete}
                  >
                    Eliminar
                  </button>
                  <button className="btn btn-outline-primary" type="submit">
                    Guardar cambios
                  </button>
                  <button className="btn btn-secondary ms-3" onClick={onVolver}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
