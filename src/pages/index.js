import React, { useEffect, useState } from "react"
import { Link } from 'gatsby';
// Images
import isotype from 'images/isotype.svg'
// Components
import Layout from "components/layout";
import ButtonsLoginGF from "components/login/buttons-login-gf";
import FooterIndex from "components/footer-index";
// Custom Hooks
import useAuthMethods from 'hooks/useAuthMethods';
import LineFooter from "components/line-footer";
import ModalBlur from 'components/modal-blur';


export default function Home() {

  const { authState } = useAuthMethods();

  useEffect(() => {
    authState();
    //eslint-disable-next-line
  }, [/* dependencia */]);

  const handleModalBlur = () => {
    const modal = document.querySelector('.modal-blur');
    const modalContent = document.querySelector('.modal-blur-content');

    if(modal.className === 'modal-blur'){
      modal.className = 'modal-blur on'

      const both = modalContent.clientHeight / 2;
      modalContent.style.top = `calc(50% - ${both}px)`;

      modalContent.querySelector('#email').focus();
    }
  };
  const closeModal = () => {
    const modal = document.querySelector('.modal-blur');
    modal.className = 'modal-blur';
  };

  return(
    <Layout>

      <ModalBlur closeModal={ closeModal }/>
      

      <section className="flex flex-col justify-center items-center bg-background relative min-h-screen px-16 text-title-item z-0">
        <img src={ isotype } alt="isotype" className="w-32 h-32 sm:w-40 sm:h-40"/>
        <h1 className="text-2xl font-semibold text-carbon-500 sm:text-3xl">Alain Boutique</h1>
        <p className="text-carbon-200">Sales manager 1.0.0</p>

        <ButtonsLoginGF />

        <p className="mt-4 text-carbon-200 text-center">
          <button 
            className="text-p_blue-500"
            onClick={ handleModalBlur }
          >
            Inici
            <svg viewBox="0 0 20 20" fill="currentColor" className="at-symbol w-4 h-4 inline-block"><path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd"></path></svg>
            r sesión
          </button> con tu correo electrónico
        </p> 

        <hr className="my-3 border-bluegray-100 w-full sm:w-64"/>
        <p className="text-description text-carbon-200 w-64 text-center mb-3">
          Si no tienes una cuenta activa, puedes <Link to="/sign-up" className="text-p_blue-500">registrarte con tu corre</Link>
        </p>

        <FooterIndex />
        <LineFooter />

      </section>
    </Layout>
  )
}