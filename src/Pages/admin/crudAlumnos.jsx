import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { Typography, Button, Checkbox} from "@material-tailwind/react";
import axios from 'axios'; // Import Axios library

function CrudAdlumnos() {
  const perPage = 10; // Cantidad de usuarios por página
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]); // State to hold user data

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/Alumno/'); // Replace with your API endpoint
        setUsersData(response.data); // Update the state with API data
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

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

      <Sidebar />
      <div className="p-4 mt-12 sm:ml-64">
        <div>
          <div className="mt-2 mb-4">
            <Typography variant="h1" className="font-extrabold">Alumnos</Typography>
            <Typography className="text-lg " >
            Aquí podrás ver, editar, eliminar o crear nuevos alumnos según tus
                necesidades.
            </Typography>
          </div>
          <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
            <div>
            </div>
            <div className="relative w-full">
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  w-full	 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
            <div className="flex">
              <Button color="red" className="flex items-center justify-center "> 
                <FontAwesomeIcon icon={faTrash} size="xl" className="mr-2" />
                Eliminar
            </Button>
            <Button color="blue" className="flex items-center justify-center "> 
                <FontAwesomeIcon icon={faTrash} size="xl" className="mr-2" />
                Eliminar
            </Button>
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
                      <Checkbox 
  color="red" 
  id={`checkbox-table-search-${user.id}`}
  type="checkbox"
  className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${currentPage === user.id ? 'hover:bg-red-100 dark:hover:bg-red-600' : ''}`}
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
                    <td className="px-6 py-4">{user.carrera}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">{user.curso}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button color="white"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                       <FontAwesomeIcon icon={faUserPen} size="xl" className="mr-2 duration-200 hover:scale-110 active:scale-90" />
                      </button>
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
                  <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-2 text-sm duration-300 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white shadow-none font-bold text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </Button>
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
