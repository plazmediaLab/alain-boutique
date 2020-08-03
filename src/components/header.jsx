import React, { useRef } from 'react';
import BackgroundToggle from './nav-bar-toggle/background-toggle';
import ContentToggle from './nav-bar-toggle/content-toggle';
import useToggleActions from '../hooks/useToggleActions';

export default function Header({ location }){

  let backgroundToggle = useRef(null);
  let containerToggle = useRef(null);

  // eslint-disabled-next-line
  const [ status, openToggle ] = useToggleActions();

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
    <header className="header text-carbon-500 relative col-gap-2 items-center px-3 py-1">
      {/* <BtnToggleOpen toggle={() => toggleOpen()} isOpen={ isOpen }/> */}
      <button type="button" className="p-2 z-50" onClick={ () => openToggle(backgroundToggle, containerToggle ) }>
        <svg 
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
        </svg>
      </button>
      <h1 className="text-2xl text-center">{ title() }</h1>
      <button type="button" className="p-2" onClick={ () => console.log('Serach...') }>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
      </button>

      <ContentToggle reference={ containerToggle } />

      <BackgroundToggle reference={ backgroundToggle } openToggle={ () => openToggle(backgroundToggle, containerToggle ) } />

    </header>
  );
};