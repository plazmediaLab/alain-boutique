/** @jsx jsx */
import { useContext } from 'react';
import { jsx, css } from '@emotion/core';
import UserContext from '../../context/user/UserContext';
// Images
import PlazmediaLogo from '../../images/plazmedia-logo-ligth.svg';
import PerfilDefaultImage from '../../images/perfil-default-img.png';
// ---------------------------------------------------------------
import useAuthMethods from '../../hooks/useAuthMethods';
import { Link } from 'gatsby';
import useToggleActions from 'hooks/useToggleActions';

export default function ContentToggle({ reference, openToggle }){

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const { logOut } = useAuthMethods()

  return (
    <div
      ref={ reference }
      className="bg-white fixed top-0 left-0 z-40"
      css={css`
        overflow: hidden;
        width: 0px;
        height: 100vh;
        transition: all .3s ease-in-out;
      `}
    >
      <div css={css`
        width: 330px;
        min-width: 330px;
      `}>
        <ul 
          className="pt-20"
        >
          <div className="p-4 flex whitespace-no-wrap">
            <img src={user.photo ? user.photo : PerfilDefaultImage} alt="Avatar Google" className="rounded-full bg-white" css={css`
              width: 2.5rem;
              height: 2.5rem;
              min-width: 2.5rem;
              min-height: 2.5rem;
              margin-right: 1rem;
            `}/>
            <div>
              <p className="text-p_blue-500">{user.name}</p>
              <p className="text-xs text-carbon-200">{user.email}</p> 
            </div>
          </div>
          <li className="text-sm cursor-pointer border-r-4 border-bluegray-200 hover:border-p_blue-500 hover:bg-background">
            <Link to={`/app/user/${ user.uid }`} onClick={openToggle} className="p-4 block">Mi perfil</Link>
          </li>
          <li className="text-sm cursor-pointer border-r-4 border-bluegray-200 hover:border-p_blue-500 hover:bg-background">
            <Link to="/app/parner" onClick={openToggle} className="p-4 block">Parner</Link>
          </li>
          <div className="p-4">
            <hr className="border-bluegray-100"/>
            <button 
              className="w-full min-w-full whitespace-no-wrap py-2 px-4 border border-red-600 bg-transparent text-red-600 text-sm rounded-full mt-3 hover:bg-red-600 hover:text-white"
              onClick={() => logOut()}
            >
              Cerrar sesión
            </button>
          </div>
        </ul>
        <footer className="absolute bottom-0 mb-5 whitespace-no-wrap grid grid-flow-col justify-center items-center w-full">
          <p className="text-carbon-200 text-sm inline-block">Created by</p>&nbsp;&nbsp;
          <img src={ PlazmediaLogo } alt="Plazmedia imagotype" className="inline-block"/>
        </footer>
      </div>
    </div>
  );
};