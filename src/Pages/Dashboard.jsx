import React from "react";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { rol } = useParams();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Rol: {rol}</p>
      {/* Puedes mostrar contenido específico según el rol aquí */}
    </div>
  );
}

export default Dashboard;
