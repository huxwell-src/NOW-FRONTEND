import {} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Recuperar, Home } from "./Pages";
import CrudAlumnos from "./Pages/admin/crudAlumnos";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alumnos-admin" element={<CrudAlumnos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
