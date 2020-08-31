/**@jsx jsx */
import { useRef } from 'react';
import BackgroundToggle from './nav-bar-toggle/background-toggle';
import ContentToggle from './nav-bar-toggle/content-toggle';
import useToggleActions from '../hooks/useToggleActions';
import { jsx, css } from '@emotion/core';
import BtnToggle from './nav-bar-toggle/btn-toggle';
import { navigate } from 'gatsby';


export default function Header({ location }){

  let backgroundToggle = useRef(null);
  let containerToggle = useRef(null);
  let btnToggle = useRef(null);

  // eslint-disabled-next-line
  const { openToggle } = useToggleActions();

  const title = () => {
    switch (location) {
      case '/app':
        return 'Inicio'
      case '/app/sales':
        return 'Vendidos'
      case '/app/sumary':
        return 'Resumen'
      case '/app/new':
        return 'Agregar'

      default:
        break
    }
  };

  return (
    <header 
      className="text-carbon-500 relative col-gap-2 items-center px-3 py-1 mb-6 z-50"
      css={css`
        display: grid;
        grid-template-columns: auto 1fr auto;
      `}
    >
      
      <BtnToggle reference={ btnToggle } openToggle={ () => openToggle(btnToggle, backgroundToggle, containerToggle ) } />

      <h1 className="text-title-page font-medium text-center">{ title() }</h1>

      <button type="button" className={`p-2 rounded-full ${location === '/app/search' ? 'bg-p_blue-300 text-white' : '' }`} onClick={ () => navigate('/app/search') }>
        <svg className={`w-5 h-5`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
      </button>

      <ContentToggle reference={ containerToggle } openToggle={ () => openToggle(btnToggle, backgroundToggle, containerToggle ) }/>

      <BackgroundToggle reference={ backgroundToggle } openToggle={ () => openToggle(btnToggle, backgroundToggle, containerToggle ) } />

    </header>
  );
};