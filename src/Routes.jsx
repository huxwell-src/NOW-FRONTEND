import {} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Recuperar, Home } from "./Pages";
import CrudAlumnos from "./Pages/admin/crudAlumnos";
import CrudProfesores from "./Pages/admin/CrudProfesores";
import CrudHerramientas from "./Pages/admin/CrudHerramientas";
import Dashboard from "./Pages/Dashboard";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact  path="/" element={<Login />} />
        <Route path="/dashboard/:rol" component={<Dashboard />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alumnos-view" element={<CrudAlumnos />} />
        <Route path="/profesores-view" element={<CrudProfesores />} />
        <Route path="/herramientas-view" element={<CrudHerramientas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
