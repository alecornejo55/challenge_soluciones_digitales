import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ClientesRoutes } from "../clientes";
import { childClienteRouter } from "./";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientesRoutes />,
    children: childClienteRouter
  },
]);
export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
