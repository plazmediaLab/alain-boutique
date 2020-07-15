import React from 'react';
// Images 
import PerfilDefaultImage from '../images/perfil-default-img.png';

export default function Header({ location, photo }){

  const title = () => {
    switch (location) {
      case '/app':
        return 'Inicio'
      case '/app/sales':
        return 'Productos'
      case '/app/sumary':
        return 'Resumen'
      case '/app/new':
        return 'Agregar'

      default:
        break
    }
  };

  return (
    <header className="header">
      <button className="pr-2 py-2">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <h1 className="text-2xl text-center">{ title() }</h1>
      <img src={photo ? photo : PerfilDefaultImage} alt="Avatar Google" className="w-10 h-10 rounded-full bg-white"/>
    </header>
  );
};