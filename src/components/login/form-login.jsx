import React from 'react';

export default function FromLogin(){
  return (
    <form className="flex flex-col justify-center items-center mb-4 w-full">
      <p className="text-carbon-200 mb-4 text-xs">——— O ———</p>
      <input 
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="input-form sm:w-64"
      />
      <input 
        type="password"
        name="password"
        placeholder="Contraseña"
        className="input-form sm:w-64"
      />
    </form>
  );
};