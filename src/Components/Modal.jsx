import React, { useState } from 'react';
import Modal from 'react-modal';

// Establece la referencia de la raíz de tu aplicación para el modal
Modal.setAppElement('#root');

function ModalForm({ isOpen, onRequestClose, onSubmit, formContent }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onRequestClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulario Modal"
    >
      <h2>Formulario Modal</h2>
      <form onSubmit={handleSubmit}>
        {formContent.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </Modal>
  );
}

export default ModalForm;
