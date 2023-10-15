import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import { Typography, Card, CardBody, Button, Input } from "@material-tailwind/react";
import { Modal } from '../../Components/Modal';
import { faPlus, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from 'sonner';

function CrudHerramientas() {
    // Estado para gestionar la lista de herramientas
    const [herramientas, setHerramientas] = useState([]);

    // Estado para el formulario de creación de herramientas
    const [newHerramienta, setNewHerramienta] = useState({
        id: '',
        nombre: '',
        stock: 0,
        medida_stock: 'unidades',
    });

    // Estado para la edición de herramientas
    const [editingHerramienta, setEditingHerramienta] = useState(null);

    // Estado para indicar si se está editando una herramienta
    const [isEditing, setIsEditing] = useState(false);

    // Estado para controlar la apertura del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para obtener la lista de herramientas desde la API
    const fetchHerramientas = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/Herramienta/');
            setHerramientas(response.data);
        } catch (error) {
            console.error('Error al cargar herramientas: ', error);
        }
    };

    // Función para crear una nueva herramienta
    const createHerramienta = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/Herramienta/', newHerramienta);
            fetchHerramientas();
            setNewHerramienta({
                nombre: '',
                stock: 0,
                medida_stock: 'unidades',
            });
            toast.success('Herramienta creada correctamente');
        } catch (error) {
            console.error('Error al crear herramienta: ', error);
            toast.error('Error al crear herramienta');
        }
    };

    // Función para eliminar una herramienta
    const deleteHerramienta = async (herramienta_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/Herramienta/${herramienta_id}/`);
            setIsModalOpen(true);
            setIsEditing(false);
            fetchHerramientas();
            toast.success('Herramienta eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar herramienta: ', error);
        }
    };

    // Función para editar una herramienta
    const editHerramienta = (herramienta) => {
        setEditingHerramienta(herramienta);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Función para guardar los cambios de edición
    const saveEdits = async () => {
        try {
            await axios.put(`http://localhost:8000/api/v1/Herramienta/${editingHerramienta.herramienta_id}/`, editingHerramienta);
            setIsEditing(false);
            setIsModalOpen(false);
            fetchHerramientas();
            toast.success('Herramienta guardada correctamente');
        } catch (error) {
            console.error('Error al editar herramienta: ', error);
            toast.error('Error al guardar herramienta');
        }
    };

    // Función para cancelar la edición
    const cancelEdit = () => {
        setIsEditing(false);
        setIsModalOpen(false);
    };

    // Utiliza useEffect para cargar la lista de herramientas al cargar el componente
    useEffect(() => {
        fetchHerramientas();
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
                                <Typography variant="h1" className="font-extrabold">Herramientas</Typography>
                                <Typography className="text-lg">
                                    Aquí podrás ver, editar, eliminar o crear nuevas herramientas según tus necesidades.
                                </Typography>
                                {/* Botón para agregar una nueva herramienta */}
                                <Modal
                                    btnName="Agregar"
                                    btnColor="green"
                                    btnClassName="font-bold px-4 my-4"
                                    icon={faPlus}
                                    tittle="Nueva Herramienta"
                                    cardColor="green"
                                    txtBtnRed="Cerrar"
                                    txtBtnGreen="Crear"
                                    onClickOtro={createHerramienta}
                                >
                                    <div className="mx-auto w-full max-w-[24rem]">
                                        <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                            <CardBody className="flex flex-col gap-4">
                                                <Typography variant="h3">Crear Nueva Herramienta</Typography>
                                                {/* Formulario para crear una nueva herramienta */}
                                                <div className="mb-4 flex flex-col gap-6">
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="id"
                                                        required
                                                        value={newHerramienta.id}
                                                        onChange={(e) => setNewHerramienta({ ...newHerramienta, id: e.target.value })}
                                                    />
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Nombre"
                                                        required
                                                        value={newHerramienta.nombre}
                                                        onChange={(e) => setNewHerramienta({ ...newHerramienta, nombre: e.target.value })}
                                                    />
                                                    <Input
                                                        color='blue'
                                                        size="lg"
                                                        label="Stock"
                                                        type="number"
                                                        required
                                                        value={newHerramienta.stock}
                                                        onChange={(e) => setNewHerramienta({ ...newHerramienta, stock: e.target.value })}
                                                    />
                                                    <select
                                                        id="medida_stock"
                                                        className="border border-gray-300 rounded-lg py-2 px-3"
                                                        required
                                                        value={newHerramienta.medida_stock}
                                                        onChange={(e) => setNewHerramienta({ ...newHerramienta, medida_stock: e.target.value })}
                                                    >
                                                        <option value="unidades">Unidades</option>
                                                        <option value="metros">Metros</option>
                                                        <option value="centimetros">Centímetros</option>
                                                        <option value="gramos">Gramos</option>
                                                    </select>
                                                </div>
                                            </CardBody>
                                        </form>
                                    </div>
                                </Modal>
                                {/* Tabla de herramientas */}
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3"></th>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Stock
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Medida
                                            </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    {/* Mapeo de herramientas para mostrar en la tabla */}
                                    <tbody>
                                        {herramientas.map((herramienta) => (
                                            <tr
                                                key={herramienta.herramienta_id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                    </div>
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    <div className="pl-3">
                                                        <div className="text-base font-semibold">
                                                            {herramienta.nombre}
                                                        </div>
                                                        <div className="font-normal text-gray-500">
                                                            {herramienta.stock} {herramienta.medida_stock}
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">{herramienta.stock}</td>
                                                <td className="px-6 py-4">{herramienta.medida_stock}</td>
                                                <div className="flex justify-center">
                                                    {/* Modal para eliminar herramienta */}
                                                    <Modal
                                                        btnName="Eliminar"
                                                        btnColor="red"
                                                        btnClassName="font-bold px-4 mx-2 my-4"
                                                        icon={faTrash}
                                                        tittle="Eliminar Herramienta"
                                                        cardColor="green"
                                                        txtBtnRed="Cancelar"
                                                        txtBtnGreen="Confirmar"
                                                        onClickOtro={() => deleteHerramienta(herramienta.herramienta_id)}
                                                    >
                                                        {isModalOpen && (
                                                            <div className="mx-auto w-full max-w-[24rem]">
                                                                <form className="w-80 max-w-screen-lg sm:w-96">
                                                                    <CardBody className="flex flex-col items-center gap-4">
                                                                        <Typography variant="h3">Eliminar Herramienta</Typography>
                                                                        <Typography>¿Está seguro de eliminar la herramienta?</Typography>
                                                                    </CardBody>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Modal>
                                                    {/* Modal para editar herramienta */}
                                                    <Modal
                                                        btnName="Editar"
                                                        btnColor="green"
                                                        btnClassName="font-bold px-4 mx-2 my-4"
                                                        icon={faPencil}
                                                        tittle="Editar Herramienta"
                                                        cardColor="green"
                                                        onClick={() => editHerramienta(herramienta)}
                                                        txtBtnRed="Cancelar"
                                                        txtBtnGreen="Guardar Cambios"
                                                        onClickOtro={() => saveEdits()}
                                                        handleOtro={() => cancelEdit()}
                                                    >
                                                        {isModalOpen && (
                                                            <div className="mx-auto w-full max-w-[24rem]">
                                                                <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
                                                                    <CardBody className="flex flex-col gap-4">
                                                                        <Typography variant="h3">Editar Herramienta</Typography>
                                                                        <div className="mb-4 flex flex-col gap-6">
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Nombre"
                                                                                required
                                                                                value={editingHerramienta.nombre}
                                                                                onChange={(e) => setEditingHerramienta({ ...editingHerramienta, nombre: e.target.value })}
                                                                            />
                                                                            <Input
                                                                                color="blue"
                                                                                size="lg"
                                                                                label="Stock"
                                                                                type="number"
                                                                                required
                                                                                value={editingHerramienta.stock}
                                                                                onChange={(e) => setEditingHerramienta({ ...editingHerramienta, stock: e.target.value })}
                                                                            />
                                                                            <select
                                                                                id="medida_stock"
                                                                                className="border border-gray-300 rounded-lg py-2 px-3"
                                                                                required
                                                                                value={isEditing ? editingHerramienta.medida_stock : newHerramienta.medida_stock}
                                                                                onChange={(e) => {
                                                                                    if (isEditing) {
                                                                                        setEditingHerramienta({ ...editingHerramienta, medida_stock: e.target.value });
                                                                                    } else {
                                                                                        setNewHerramienta({ ...newHerramienta, medida_stock: e.target.value });
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <option value="unidades">Unidades</option>
                                                                                <option value="metros">Metros</option>
                                                                                <option value="centimetros">Centímetros</option>
                                                                                <option value="gramos">Gramos</option>
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

export default CrudHerramientas;
