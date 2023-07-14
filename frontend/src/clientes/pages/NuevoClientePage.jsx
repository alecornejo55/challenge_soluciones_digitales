import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCliente, getSexoTipos } from "../helpers";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


export const NuevoClientePage = () => {
  const navigate = useNavigate();
  const onVolver = () => {
    navigate("/", {
      replace: true,
    });
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [sexoTiposIds, setSexoTiposIds] = useState([]);
  
  const getTipos = async () => {
    const tipos = await getSexoTipos();
    setSexoTiposIds(tipos);
  };
  
  // cargando tipos de sexo
  useEffect(() => {
    getTipos();
  }, []);
  
  const MySwal = withReactContent(Swal);
  // validación formulario
  const onSubmit = async (data) => {
    const { success, message } = await createCliente(data);
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
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="d-flex align-items-center justify-content-center">
            Nuevo cliente
          </h1>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              Ingrese los datos del nuevo cliente
            </div>
            <div className="card-body">
              <form
                action=""
                className="row g-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
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
                    Apellido
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
                    DNI
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
                    Sexo
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
                    Teléfono
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
                  <button className="btn btn-outline-primary" type="submit">
                    Crear
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
