import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ user }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET para obtener las solicitudes del alumno
    const getSolicitudes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Alumno/${user.rut}/solicitudes/`);
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes', error);
      }
    };

    getSolicitudes();
  }, [user.rut]);

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Email: {user.email}</p>
      <h2>Solicitudes</h2>
        {solicitudes.map(solicitud => (
          <ul key={solicitud.id}>
            <li> {solicitud.alumno_rut} </li> 
            <li> {solicitud.profesor_rut} </li> 
            <li>Estado: {solicitud.estado.nombre}</li> 
          </ul>
        ))}
    </div>
  );
};

export default UserProfile;
