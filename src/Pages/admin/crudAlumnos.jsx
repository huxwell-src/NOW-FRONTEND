import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import {
  Typography,
  Input,
  Card,
  CardBody,
  CardFooter,
  Button
} from "@material-tailwind/react";
import { Modal } from '../../Components/Modal';
import { faPlus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from 'sonner'

function CrudAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [newAlumno, setNewAlumno] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    carrera: '',
    curso: '',
    email: '',
    carrrera: '',
  });
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para controlar el modal

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/Alumno/');
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al cargar alumnos: ', error);
    }
  };

  const createAlumno = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/Alumno/', newAlumno);
      fetchAlumnos();
      setNewAlumno({
        rut: '',
        nombre: '',
        apellido: '',
        carrera: '',
        curso: '',
        email: '',
        carrrera: '',
      });
      toast.success('Alumno creado correctamente')
    } catch (error) {
      console.error('Error al crear alumno: ', error);
      toast.error('Error al crear alumno')
    }
  };

  const deleteAlumno = async (rut) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/Alumno/${rut}/`);
      setIsModalOpen(true);
      setIsEditing(false);
      fetchAlumnos();
      toast.success('Alumno eliminado correctamente')

    } catch (error) {
      console.error('Error al eliminar alumno: ', error);
    }
  };

  const editAlumno = (alumno) => {
    setEditingAlumno(alumno);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const saveEdits = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/Alumno/${editingAlumno.rut}/`, editingAlumno);
      setIsEditing(false);
      setIsModalOpen(false); // Cierra el modal después de guardar cambios
      fetchAlumnos();
      toast.success('Alumno guardado correctamente')

    } catch (error) {
      console.error('Error al editar alumno: ', error);
      toast.error('Error al guardar alumno')
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setIsModalOpen(false); // Cierra el modal al cancelar la edición
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);


  return (
    <>
      <Toaster richColors position="top-center" />
      <Sidebar>
        <div className="p-4 mt-12 sm:ml-64">
          <div>
            <div className="mt-2 mb-4">
              <div>
                <Typography variant="h1" className="font-extrabold">Alumnos</Typography>
                <Typography className="text-lg " >
                  Aquí podrás ver, editar, eliminar o crear nuevos alumnos según tus
                  necesidades.
                </Typography>
                <Modal
                  btnName="Agregar"
                  btnColor="green"
                  btnClassName="font-bold px-4 my-4"
                  icon={faPlus}
                  tittle="Nuevo Alumno"
                  cardColor="green"
                  txtBtnRed="Cerrar"
                  txtBtnGreen="Crear"
                  onClickOtro={createAlumno}
                >
                  <div className="mx-auto w-full max-w-[24rem]">
                    <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h3">Crear Nuevo Alumno</Typography>
                        <div className="mb-4 flex flex-col gap-6">
                          <Input
                            color='blue'
                            size="lg"
                            label="Rut"
                            value={newAlumno.rut}
                            onChange={(e) => setNewAlumno({ ...newAlumno, rut: e.target.value })}
                          />
                          <Input
                            color='blue'
                            size="lg"
                            label="Nombres"
                            value={newAlumno.nombre}
                            onChange={(e) => setNewAlumno({ ...newAlumno, nombre: e.target.value })}
                          />
                          <Input
                            color='blue'
                            size="lg"
                            label="Apellidos"
                            value={newAlumno.apellido}
                            onChange={(e) => setNewAlumno({ ...newAlumno, apellido: e.target.value })}
                          />
                          <select
                            id="carrera"
                            className="border border-gray-300 rounded-lg py-2 px-3"
                            value={newAlumno.carrera}
                            onChange={(e) => setNewAlumno({ ...newAlumno, carrera: e.target.value })}
                          >
                            <option disabled selected value="">Electivo</option>
                            <option className='hover:bg-blue-gray-200' value="Construcción (edificación)">Construcción (edificación)</option>
                            <option className='hover:bg-blue-gray-200' value="Construcciones Metálicas">Construcciones Metálicas</option>
                            <option className='hover:bg-blue-gray-200' value="Electricidad">Electricidad</option>
                          </select>
                          <select
                            id="curso"
                            className="border border-blue-400 rounded-lg py-2 px-3"
                            value={newAlumno.curso}
                            onChange={(e) => setNewAlumno({ ...newAlumno, curso: e.target.value })}
                          >
                            <option disabled selected value="">Curso</option>
                            <option value="3 A">3 A</option>
                            <option value="3 B">3 B</option>
                            <option value="3 A">3 A</option>
                            <option value="4 A">4 A</option>
                            <option value="4 B">4 B</option>
                            <option value="4 C">4 c</option>
                          </select>
                          <Input
                            color='blue'
                            size="lg"
                            label="Email"
                            value={newAlumno.email}
                            onChange={(e) => setNewAlumno({ ...newAlumno, email: e.target.value })}
                          />
                        </div>
                      </CardBody>
                    </form>
                  </div>
                </Modal>
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
                      <th scope="col" className="px-10 py-3">
                        Curso
                      </th>
                      <th scope="col" >

                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {alumnos.map((alumno) => (
                      <tr
                        key={alumno.rut}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <label
                              htmlFor={`checkbox-table-search-${alumno.rut}`}
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
                              {alumno.nombre}  {alumno.apellido}
                            </div>
                            <div className="font-normal text-gray-500">
                              {alumno.email}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{alumno.carrera}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">{alumno.curso}</div>
                        </td>

                        <div className="flex justify-center">
                          <Modal
                            btnName="Eliminar"
                            btnColor="red"
                            btnClassName="font-bold px-4 mx-2 my-4"
                            icon={faTrash}
                            tittle="Editar Alumno"
                            cardColor="green"
                            txtBtnRed="Cancelar"
                            txtBtnGreen="Confirmar"
                            onClickOtro={() => deleteAlumno(alumno.rut)}
                          >
                            {isModalOpen && (
                              <div className="mx-auto w-full max-w-[24rem]">
                                <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                  <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h3">Eliminar Alumno</Typography>
                                    <Typography>Esta seguro de elimar?</Typography>
                                  </CardBody>
                                </form>
                              </div>
                            )}
                          </Modal>

                          <Modal
                            btnName="Editar"
                            btnColor="green"
                            btnClassName="font-bold px-4 mx-2 my-4"
                            icon={faUserPen}
                            tittle="Editar Alumno"
                            cardColor="green"
                            onClick={() => editAlumno(alumno)}
                            txtBtnRed="Cancelar"
                            txtBtnGreen="Guardar Cambios"
                            onClickOtro={() => saveEdits()}
                            handleOtro={() => cancelEdit()}
                          >
                            {isModalOpen && (
                              <div className="mx-auto w-full max-w-[24rem]">
                                <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                  <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h3">Editar Alumno</Typography>
                                    <div className="mb-4 flex flex-col gap-6">
                                      <Input
                                        color="blue"
                                        size="lg"
                                        label="Rut"
                                        disabled
                                        value={editingAlumno.rut}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, rut: e.target.value })
                                        }
                                      />
                                      <Input
                                        color="blue"
                                        size="lg"
                                        label="Nombre"
                                        value={editingAlumno.nombre}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, nombre: e.target.value })
                                        }
                                      />
                                      <Input
                                        color="blue"
                                        size="lg"
                                        label="Apellidos"
                                        value={editingAlumno.apellido}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, apellido: e.target.value })
                                        }
                                      />
                                      <Input
                                        color="blue"
                                        size="lg"
                                        label="Email"
                                        value={editingAlumno.email}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, email: e.target.value })
                                        }
                                      />
                                      <select
                                        id="carrera"
                                        className="border border-gray-300 rounded-lg py-2 px-3"
                                        value={editingAlumno.carrera}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, carrera: e.target.value })
                                        }
                                      >
                                        <option className='hover:bg-blue-gray-200 ' value="Construcción (edificación)">Construcción (edificación)</option>
                                        <option className='hover:bg-blue-gray-200 ' value="Construcciones Metálicas">Construcciones Metálicas</option>
                                        <option className='hover:bg-blue-gray-200 ' value="Electricidad">Electricidad</option>
                                      </select>

                                      <select
                                        id="curso"
                                        className="border border-blue-400 rounded-lg py-2 px-3"
                                        value={editingAlumno.curso}
                                        onChange={(e) =>
                                          setEditingAlumno({ ...editingAlumno, curso: e.target.value })
                                        }
                                      >
                                        <option value="3 A">3 A</option>
                                        <option value="3 B">3 B</option>
                                        <option value="3 A">3 A</option>
                                        <option value="4 A">4 A</option>
                                        <option value="4 B">4 B</option>
                                        <option value="4 C">4 c</option>

                                        {/* Agrega más opciones según tus necesidades */}
                                      </select>
                                      {/* Resto de tus campos de edición */}
                                    </div>
                                  </CardBody>
                                </form>
                              </div>
                            )}
                          </Modal>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default CrudAlumnos;
