import React from 'react';
import { Card, Button, Typography } from "@material-tailwind/react";

const herramientas = [
  {
    "herramienta_id": 1,
    "nombre": "Martillo",
    "stock": 10,
    "medida_stock": "unidades"
  },
  {
    "herramienta_id": 2,
    "nombre": "Destornillador",
    "stock": 15,
    "medida_stock": "unidades"
  },
  {
    "herramienta_id": 3,
    "nombre": "Sierra",
    "stock": 5,
    "medida_stock": "unidades"
  },
  {
    "herramienta_id": 4,
    "nombre": "Taladro",
    "stock": 8,
    "medida_stock": "unidades"
  },
  {
    "herramienta_id": 5,
    "nombre": "Cinta Métrica",
    "stock": 20,
    "medida_stock": "metros"
  }
];

const Productos = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Listado de Herramientas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {herramientas.map(herramienta => (
          <Card key={herramienta.herramienta_id} className="p-4 space-y-2 bg-white rounded-lg shadow">
            <Typography color="black" variant="h5" className="mb-2">{herramienta.nombre}</Typography>
            <Typography color="gray" variant="p" >Stock: {herramienta.stock} {herramienta.medida_stock}</Typography>
            <Button color='blue' ripple='light' fullWidth className="mt-2">Añadir</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Productos;
