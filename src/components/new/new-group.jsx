import React, { useContext } from 'react';
import UserContext from '../../context/user/UserContext';

export default function NewGroup(){

  const userContext = useContext(UserContext);
  const { closeModal } = userContext

  // TODO · Continuar con la creación de grupos 07/24/2020 
  const onSubmit = e => {
    e.preventDefault()
    closeModal();
    console.log('Cerrar');
  };

  return (
    <form
      className="w-full"
      onSubmit={ onSubmit }
    >
      <label htmlFor="name_group" className="text-xl font-light text-p_blue-500 text-center inline-block w-full pb-2 mb-2">Nombre del grupo</label>
      <input
        id="name_group"
        name="name_group" 
        type="text"
        placeholder="Ropa de mi bebé"
        className="input-form"
      />
      <button 
        type="submit"
        className="w-full p-2 bg-p_blue-500 rounded text-white mt-2"
      >Crear grupo</button>
    </form>
  );
};