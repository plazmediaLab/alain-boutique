/** @jsx jsx */
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, useCycle } from 'framer-motion';
import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/core';
import UserContext from '../context/user/UserContext';
// Images
import PlazmediaLogo from '../images/plazmedia-logo-ligth.svg';
import PerfilDefaultImage from '../images/perfil-default-img.png';
import useDbMethods from '../hooks/useDbMethods';

export default function Header({ location }){

  let backgroundToggle = useRef(null);
  let containerToggle = useRef(null);

  const [toggle, setToggle] = useState(false);

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const { logOut } = useDbMethods();

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
  
  useEffect(() => {

  }, [/* dependencia */]);

  function FadeIn(element, maxOpacity = 1) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= maxOpacity){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
  };
  function FadeOut(element, initialOpacity = 1) {
    var op = initialOpacity;  // initial opacity
    var timer = setInterval(function () {
        if (op < 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 8);
  }
  
  const openToggle = () => {
    containerToggle.current.classList.toggle("shadow-menutoggle");
    if(!toggle){
      setToggle(true)
      FadeIn(backgroundToggle.current, 0.8);
      containerToggle.current.style.width = '350px';
    }else{
      setToggle(false)
      containerToggle.current.style.width = '0px';
      setTimeout(() => {
        FadeOut(backgroundToggle.current, 0.8);
      }, 300);
    }
  };

  return (
    <header className="header text-carbon-500 relative col-gap-2 items-center px-3 py-1">
      {/* <BtnToggleOpen toggle={() => toggleOpen()} isOpen={ isOpen }/> */}
      <button type="button" className="p-2 z-50" onClick={ openToggle }>
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

      <div
        ref={ containerToggle }
        className="bg-white fixed top-0 left-0 z-40"
        css={css`
          overflow: hidden;
          width: 0px;
          height: 100vh;
          transition: all .3s ease-in-out;
        `}
      >
        <div css={css`
          width: 350px;
          min-width: 350px;
        `}>
          <ul className="pt-20">
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
            {/* <li className="p-4 bg-background border-r-4 border-p_blue-500">
              Item
            </li> */}
            <div className="p-4">
              <hr className="border-bluegray-100"/>
              <button 
                className="w-full min-w-full whitespace-no-wrap py-2 px-4 border border-red-600 bg-transparent text-red-600 text-sm rounded-full mt-3 hover:bg-red-600 hover:text-white"
                onClick={logOut}
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
      <div 
        ref={ backgroundToggle }
        onClick={ openToggle }
        className={`bg-toggle`}
      ></div>

    </header>
  );
};