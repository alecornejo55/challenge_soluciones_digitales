import { Navigate } from "react-router-dom";
import { ClientesPage, EditarClientePage, NuevoClientePage } from "../clientes";

export const childClienteRouter = [
  {
    path: "",
    element: <ClientesPage />,
  },
  {
    path: "nuevo",
    element: <NuevoClientePage />
  },
  {
    path: 'editar/:id',
    element: <EditarClientePage />
  },
  {
    path: "/*",
    element: <Navigate to={""} />,
  },
];
