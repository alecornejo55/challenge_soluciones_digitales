import { Outlet } from "react-router-dom"
import { Navbar } from "../../ui"

export const ClientesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}
