import React, { useState } from "react";
import { Button, Dialog, Card, CardHeader, Typography, CardFooter } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";

export function Modal({
  btnName,
  btnColor,
  btnClassName,
  tittle,
  cardColor,
  children,
  icon,
  onClick,
  onClickOtro,
  txtBtnGreen,
  txtBtnRed,
  handleOtro
}) {
  // Utiliza el hook useState para gestionar el estado 'open'
  const [open, setOpen] = useState(false);

  // Función para abrir el modal
  const handleOpen = () => {
    setOpen((cur) => !cur); // Invierte el estado 'open'
    if (onClick) {
      onClick();
    }
  };

  // Función para cerrar el modal
  const handleExit = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button onClick={handleOpen} color={btnColor} className={btnClassName}>
        {icon && <FontAwesomeIcon icon={icon} size="xl" className="mr-2" />}
        {btnName}
      </Button>

      {/* Modal */}
      <Dialog size="sm" open={open} handler={handleOpen} className="bg-transparent shadow-none relative">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader variant="gradient" color={cardColor} className="mb-4 grid h-20 place-items-center">
            <Typography variant="h3" color="white">
              {tittle}
            </Typography>
          </CardHeader>
          {children}
          <CardFooter>
            <div className="flex justify-around">
              {/* Botón rojo para cerrar el modal y ejecutar 'handleOtro' */}
              <Button onClick={() => { handleExit(); handleOtro(); }} color="red">
                {txtBtnRed}
              </Button>
              {/* Botón verde para ejecutar 'onClickOtro' y cerrar el modal */}
              <Button color="green" onClick={() => { onClickOtro(); handleExit(); }}>
                {txtBtnGreen}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
