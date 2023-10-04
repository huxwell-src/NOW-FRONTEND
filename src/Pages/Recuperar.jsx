import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography
  } from "@material-tailwind/react";

const Recuperar = () => {
  return (
    <div className='h-[100vh] w-full   flex items-center justify-center'>
      <Card  className='p-5 bg-Slate-50' shadow="sm">
        <Typography variant="h4" className="text-center" color="blue-gray">
          ¿Olvidaste tu contraseña? 
        </Typography>
        <Typography variant="h5" className="text-center" color="blue-gray">
          No te preocupes, es posible recuperarla
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Ingresa tu email
        </Typography>
        <form className="mt-4 mb-2¿">
          <div className="mb-4 flex flex-col gap-6">
            <Input color='light-blue'  size="lg" label="Email" />
          </div>
          <Button className="mt-6" color='light-blue' fullWidth>
            Recuperar
          </Button>
          <Typography color="gray" className="mt-4 text-left font-normal">
            <Link to="/" href="#" className="font-medium text-gray-900">
              Olvidalo, la he recordado
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Recuperar