import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";

const usersData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    curso: "1A",
    electivo: "Carpintería",
    imageUrl: "https://example.com/juan_perez.jpg",
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria.garcia@example.com",
    curso: "2B",
    electivo: "Mecánica",
    imageUrl: "https://example.com/maria_garcia.jpg",
  },
  {
    id: 3,
    nombre: "Luis Rodríguez",
    email: "luis.rodriguez@example.com",
    curso: "3C",
    electivo: "Electricidad",
    imageUrl: "https://example.com/luis_rodriguez.jpg",
  },
  {
    id: 4,
    nombre: "Ana López",
    email: "ana.lopez@example.com",
    curso: "1A",
    electivo: "Construcción",
    imageUrl: "https://example.com/ana_lopez.jpg",
  },
  {
    id: 5,
    nombre: "Pedro González",
    email: "pedro.gonzalez@example.com",
    curso: "2B",
    electivo: "Carpintería",
    imageUrl: "https://example.com/pedro_gonzalez.jpg",
  },
  {
    id: 6,
    nombre: "Laura Martínez",
    email: "laura.martinez@example.com",
    curso: "3C",
    electivo: "Mecánica",
    imageUrl: "https://example.com/laura_martinez.jpg",
  },
  {
    id: 7,
    nombre: "Carlos Sánchez",
    email: "carlos.sanchez@example.com",
    curso: "1A",
    electivo: "Electricidad",
    imageUrl: "https://example.com/carlos_sanchez.jpg",
  },
  {
    id: 8,
    nombre: "Sofía López",
    email: "sofia.lopez@example.com",
    curso: "2B",
    electivo: "Construcción",
    imageUrl: "https://example.com/sofia_lopez.jpg",
  },
  {
    id: 9,
    nombre: "Javier Ramírez",
    email: "javier.ramirez@example.com",
    curso: "3C",
    electivo: "Carpintería",
    imageUrl: "https://example.com/javier_ramirez.jpg",
  },
  {
    id: 10,
    nombre: "Elena Torres",
    email: "elena.torres@example.com",
    curso: "1A",
    electivo: "Mecánica",
    imageUrl: "https://example.com/elena_torres.jpg",
  },
  {
    id: 11,
    nombre: "Estudiante 1",
    email: "estudiante1@example.com",
    curso: "Curso 1",
    electivo: "Carpinteria",
    imageUrl: "imagen1.jpg",
  },
  {
    id: 12,
    nombre: "Estudiante 2",
    email: "estudiante2@example.com",
    curso: "Curso 2",
    electivo: "Mecanica",
    imageUrl: "imagen2.jpg",
  },
  {
    id: 13,
    nombre: "Estudiante 3",
    email: "estudiante3@example.com",
    curso: "Curso 3",
    electivo: "Electricidad",
    imageUrl: "imagen3.jpg",
  },
  {
    id: 14,
    nombre: "Estudiante 4",
    email: "estudiante4@example.com",
    curso: "Curso 4",
    electivo: "Construccion",
    imageUrl: "imagen4.jpg",
  },
  {
    id: 15,
    nombre: "Estudiante 5",
    email: "estudiante5@example.com",
    curso: "Curso 5",
    electivo: "Carpinteria",
    imageUrl: "imagen5.jpg",
  },
  {
    id: 16,
    nombre: "Estudiante 6",
    email: "estudiante6@example.com",
    curso: "Curso 6",
    electivo: "Mecanica",
    imageUrl: "imagen6.jpg",
  },
  {
    id: 17,
    nombre: "Estudiante 7",
    email: "estudiante7@example.com",
    curso: "Curso 7",
    electivo: "Electricidad",
    imageUrl: "imagen7.jpg",
  },
  {
    id: 18,
    nombre: "Estudiante 8",
    email: "estudiante8@example.com",
    curso: "Curso 8",
    electivo: "Construccion",
    imageUrl: "imagen8.jpg",
  },
  {
    id: 19,
    nombre: "Estudiante 9",
    email: "estudiante9@example.com",
    curso: "Curso 9",
    electivo: "Carpinteria",
    imageUrl: "imagen9.jpg",
  },
  {
    id: 20,
    nombre: "Estudiante 10",
    email: "estudiante10@example.com",
    curso: "Curso 10",
    electivo: "Mecanica",
    imageUrl: "imagen10.jpg",
  },
];

function CrudAdlumnos() {
  const perPage = 10; // Cantidad de usuarios por página
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para dividir los usuarios en páginas
  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return usersData.slice(startIndex, endIndex);
  };

  const paginatedUsers = paginateUsers();

  return (
    <>
      <a
        href="#"
        className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline"
      >
        Read more
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>

      <Sidebar />
      <div className="p-4 mt-4 sm:ml-64">
        <div className="">
          <h2 className="text-4xl font-extrabold dark:text-white">Alumnos</h2>
          <p className="my-4 text-lg text-gray-500">
            Aquí podrás ver, editar, eliminar o crear nuevos alumnos según tus
            necesidades.
          </p>

          <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Action
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div>
              {/* Dropdown menu */}
              <div
                id="dropdownAction"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Eliminar
                  </a>
                </div>
              </div>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Buscar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
          <div className="relative overflow-x-auto shadow sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Electivo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Curso
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${user.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${user.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* 
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.imageUrl}
                        alt={`${user.name} image`}
                      />
                    */}
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user.nombre}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{user.electivo}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">{user.curso}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          className=" fill-blue-500	"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {usersData.length > perPage && (
            <div className="flex justify-center mt-4">
              {[...Array(Math.ceil(usersData.length / perPage))].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-2 text-sm rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white font-bold text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CrudAdlumnos;
