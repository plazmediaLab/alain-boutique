import React, { useState } from 'react';
// import { useContext } from 'react';
// import UserContext from '../../context/user/UserContext';

export default function FormNewProduct(){

  // Local STATE 
  const [group, setGroup] = useState('');



  // const userContext = useContext(UserContext);
  // const { user } = userContext;

  const onSubmit = e => {
    e.preventDefault();
    console.log(group);
  };

  return (
    <form
      onSubmit={ onSubmit }
    >
      <div>
        <label className="label-form w-full" htmlFor="name">Nombre del grupo
          <input 
            className="input-form mt-2"
            type="text"
            name="name" id="name"
            placeholder="Ropa de mamá"
            value={ group }
            onChange={ e => setGroup(e.target.value) }
          />
        </label>
      </div>
      <button 
        type="submit"
        className="w-full bg-green-500 text-white uppercase text-sm p-2 rounded cursor-pointer"
      >Crear grupo</button>
    </form>
  );
};