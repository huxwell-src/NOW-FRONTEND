import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import { Typography, Input, Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { Modal } from '../../Components/Modal';
import { faPlus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from 'sonner';

function CrudProfesores() {
    // Estado para gestionar la lista de profesores
    const [profesores, setProfesores] = useState([]);

    // Estado para el formulario de creación de profesores
    const [newProfesor, setNewProfesor] = useState({
        rut: '',
        nombre: '',
        apellido: '',
        carrera: '',
        email: '',
    });

    // Estado para la edición de profesores
    const [editingProfesor, setEditingProfesor] = useState(null);

    // Estado para indicar si se está editando un profesor
    const [isEditing, setIsEditing] = useState(false);

    // Estado para controlar la apertura del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para obtener la lista de profesores desde la API
    const fetchProfesores = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/Profesor/');
            setProfesores(response.data);
        } catch (error) {
            console.error('Error al cargar profesores: ', error);
        }
    };

    // Función para crear un nuevo profesor
    const createProfesor = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/Profesor/', newProfesor);
            fetchProfesores();
            setNewProfesor({
                rut: '',
                nombre: '',
                apellido: '',
                carrera: '',
                email: '',
            });
            toast.success('Profesor creado correctamente');
        } catch (error) {
            console.error('Error al crear profesor: ', error);
            toast.error('Error al crear profesor');
        }
    };

    // Función para eliminar un profesor
    const deleteProfesor = async (rut) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/Profesor/${rut}/`);
            setIsModalOpen(true);
            setIsEditing(false);
            fetchProfesores();
            toast.success('Profesor eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar profesor: ', error);
        }
    };

    // Función para editar un profesor
    const editProfesor = (profesor) => {
        setEditingProfesor(profesor);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Función para guardar los cambios de edición
    const saveEdits = async () => {
        try {
            await axios.put(`http://localhost:8000/api/v1/Profesor/${editingProfesor.rut}/`, editingProfesor);
            setIsEditing(false);
            setIsModalOpen(false);
            fetchProfesores();
            toast.success('Profesor guardado correctamente');
        } catch (error) {
            console.error('Error al editar profesor: ', error);
            toast.error('Error al guardar profesor');
        }
    };

    // Función para cancelar la edición
    const cancelEdit = () => {
        setIsEditing(false);
        setIsModalOpen(false);
    };

    // Utiliza useEffect para cargar la lista de profesores al cargar el componente
    useEffect(() => {
        fetchProfesores();
    }, []);

    return (
        <>
            {/* Componente Toaster para mostrar notificaciones */}
            <Toaster richColors position="top-center" />
            <Sidebar>
                <div className="p-4 mt-12 sm:ml-64">
                    <div>
                        <div className="mt-2 mb-4">
                            <div>
                                {/* Título y descripción de la página */}
                                <Typography variant="h1" className="font-extrabold">Profesores</Typography>
                                <Typography className="text-lg">
                                    Aquí podrás ver, editar, eliminar o crear nuevos profesores según tus necesidades.
                                </Typography>
                                {/* Botón para agregar un nuevo profesor */}
                                <Modal
                                    btnName="Agregar"
                                    btnColor="green"
                                    btnClassName="font-bold px-4 my-4"
                                    icon={faPlus}
                                    tittle="Nuevo Profesor"
                                    cardColor="green"
                                    txtBtnRed="Cerrar"
                                    txtBtnGreen="Crear"
                                    onClickOtro={createProfesor}

                                >
                                    <div className="mx-auto w-full max-w-[24rem]">
                                        <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                            <CardBody className="flex flex-col gap-4">
                                                <Typography variant="h3">Crear Nuevo Profesor</Typography>
                                                {/* Formulario para crear un nuevo profesor */}
                                                <div className="mb-4 flex flex-col gap-6">
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Rut"
                                                        required
                                                        value={newProfesor.rut}
                                                        onChange={(e) => setNewProfesor({ ...newProfesor, rut: e.target.value })}
                                                    />
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Nombre"
                                                        required
                                                        value={newProfesor.nombre}
                                                        onChange={(e) => setNewProfesor({ ...newProfesor, nombre: e.target.value })}
                                                    />
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Apellido"
                                                        required
                                                        value={newProfesor.apellido}
                                                        onChange={(e) => setNewProfesor({ ...newProfesor, apellido: e.target.value })}
                                                    />
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Email"
                                                        required
                                                        value={newProfesor.email}
                                                        onChange={(e) => setNewProfesor({ ...newProfesor, email: e.target.value })}
                                                    />
                                                    <select
                                                        id="carrera"
                                                        className="border border-gray-300 rounded-lg py-2 px-3"
                                                        required
                                                        value={newProfesor.carrera}
                                                        onChange={(e) => setNewProfesor({ ...newProfesor, carrera: e.target.value })}
                                                    >
                                                        <option disabled selected value="">Electivo</option>
                                                        <option className='hover:bg-blue-gray-200' value="Construcción (edificación)">Construcción (edificación)</option>
                                                        <option className='hover:bg-blue-gray-200' value="Construcciones Metálicas">Construcciones Metálicas</option>
                                                        <option className='hover:bg-blue-gray-200' value="Electricidad">Electricidad</option>
                                                    </select>
                                                </div>
                                            </CardBody>
                                        </form>
                                    </div>
                                </Modal>
                                {/* Tabla de profesores */}
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3"></th>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Carrera
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    {/* Mapeo de profesores para mostrar en la tabla */}
                                    <tbody>
                                        {profesores.map((profesor) => (
                                            <tr
                                                key={profesor.rut}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td className="w-4 p-4">
                                                    
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    <div className="pl-3">
                                                        <div className="text-base font-semibold">
                                                            {profesor.nombre} {profesor.apellido}
                                                        </div>
                                                        <div className="font-normal text-gray-500">
                                                            {profesor.email}
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">{profesor.carrera}</td>
                                                <td className="px-6 py-4">{profesor.email}</td>
                                                <div className="flex justify-center">
                                                    {/* Modal para eliminar profesor */}
                                                    <Modal
                                                        btnName="Eliminar"
                                                        btnColor="red"
                                                        btnClassName="font-bold px-4 mx-2 my-4"
                                                        icon={faTrash}
                                                        tittle="Eliminar Profesor"
                                                        cardColor="green"
                                                        txtBtnRed="Cancelar"
                                                        txtBtnGreen="Confirmar"
                                                        onClickOtro={() => deleteProfesor(profesor.rut)}
                                                    >
                                                        {isModalOpen && (
                                                            <div className="mx-auto w-full max-w-[24rem]">
                                                                <form className="w-80 max-w-screen-lg sm:w-96">
                                                                    <CardBody className="flex flex-col items-center gap-4">
                                                                        <Typography variant="h3">Eliminar Profesor</Typography>
                                                                        <Typography>¿Está seguro de eliminar al profesor?</Typography>
                                                                    </CardBody>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Modal>
                                                    {/* Modal para editar profesor */}
                                                    <Modal
                                                        btnName="Editar"
                                                        btnColor="green"
                                                        btnClassName="font-bold px-4 mx-2 my-4"
                                                        icon={faUserPen}
                                                        tittle="Editar Profesor"
                                                        cardColor="green"
                                                        onClick={() => editProfesor(profesor)}
                                                        txtBtnRed="Cancelar"
                                                        txtBtnGreen="Guardar Cambios"
                                                        onClickOtro={() => saveEdits()}
                                                        handleOtro={() => cancelEdit()}
                                                    >
                                                        {isModalOpen && (
                                                            <div className="mx-auto w-full max-w-[24rem]">
                                                                <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                                                    <CardBody className="flex flex-col gap-4">
                                                                        <Typography variant="h3">Editar Profesor</Typography>
                                                                        <div className="mb-4 flex flex-col gap-6">
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Rut"
                                                                                disabled
                                                                                value={editingProfesor.rut}
                                                                            />
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Nombre"
                                                                                value={editingProfesor.nombre}
                                                                                onChange={(e) => setEditingProfesor({ ...editingProfesor, nombre: e.target.value })}
                                                                            />
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Apellido"
                                                                                value={editingProfesor.apellido}
                                                                                onChange={(e) => setEditingProfesor({ ...editingProfesor, apellido: e.target.value })}
                                                                            />
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Email"
                                                                                value={editingProfesor.email}
                                                                                onChange={(e) => setEditingProfesor({ ...editingProfesor, email: e.target.value })}
                                                                            />
                                                                            <select
                                                                                id="carrera"
                                                                                className="border border-gray-300 rounded-lg py-2 px-3"
                                                                                required
                                                                                value={editingProfesor.carrera}
                                                                                onChange={(e) => setEditingProfesor({ ...editingProfesor, carrera: e.target.value })}
                                                                            >
                                                                                <option disabled value="">Electivo</option>
                                                                                <option className='hover:bg-blue-gray-200' value="Construcción (edificación)">Construcción (edificación)</option>
                                                                                <option className='hover:bg-blue-gray-200' value="Construcciones Metálicas">Construcciones Metálicas</option>
                                                                                <option className='hover:bg-blue-gray-200' value="Electricidad">Electricidad</option>
                                                                            </select>
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

export default CrudProfesores;
