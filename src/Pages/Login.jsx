import {  } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select, 
  Option
} from "@material-tailwind/react";

function Login() {
  return (
    <div className='h-[100vh] w-full   flex items-center justify-center'>
      <Card  className='p-5 bg-Slate-50' shadow="sm">
        <Typography variant="h4" c  olor="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingresa tus credenciales
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Select label="Selecciona tu rol" required color="light-blue" fullWidth size="lg" >
              <Option>Alumno</Option>
              <Option>Profesor</Option>
              <Option>Administrados</Option>
              <Option>Pañol</Option>
            </Select>
            <Input color='light-blue' required  size="lg" label="Email" />
            <Input color='light-blue' required type="password" size="lg" label="Password" />
          </div>
          <Checkbox
            color='light-blue'
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Recuerdame
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Link to="/home" >
            <Button className="mt-6" color='light-blue' fullWidth>
                Ingresar
            </Button>
          </Link>
          <Typography color="gray" className="mt-4 text-center font-normal">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="#" to="/recuperar" className="font-medium text-gray-900 underline">
              Recuperar
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;