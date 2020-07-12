import React, { useEffect } from 'react';
import { Link } from 'gatsby';
// Custom Hooks
import useStatusAuth from '../hooks/useStatusAuth';
//Styles Components
import { MainContainer } from '../components/Styled Components/index';
// Components
import Layout from "../components/layout";
import FooterIndex from '../components/footer-index';

export default function SignUp(){
  const [ statusAuth ] = useStatusAuth();

  useEffect(() => {
    statusAuth();
    //eslint-disable-next-line
  }, [/* dependencia */]);

  return(
    <>
      {localStorage.getItem('token-user') ? null :
      (
        <Layout>
          <MainContainer>

            <h1 className="text-2xl font-semibold text-carbon-500 sm:text-3xl m-8">Registrate</h1>

            <form
              className="flex flex-col items-center w-full"
            >
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
              <input 
                type="password"
                name="password-repeat"
                placeholder="Confirma tu contraseña"
                className="input-form sm:w-64"
              />
              
              <button
                type="submit"
                className="w-full bg-p_blue-500 rounded text-white text-sm py-3 mt-4 sm:w-64 hover:bg-p_blue-400"
              >
                Enviar
              </button>
            </form>

            <hr className="my-4 border-carbon-100 w-full sm:w-64"/>
            <p className="text-carbon-200">Si ya tienes una cuenta</p>
            <Link to="/" className="text-p_blue-500">Inicia sesión</Link>
            
            <FooterIndex />
          </MainContainer>
        </Layout>
      )}
    </>
  )
};