import React, { useEffect } from 'react';
import { Link } from 'gatsby';
// Custom Hooks
import useStatusAuth from '../hooks/useStatusAuth';
//Styles Components
import { MainContainer } from '../components/Styled Components/index';
// Components
import Layout from "../components/layout";
import FooterIndex from '../components/footer-index';
import FormSignUp from '../components/sign-up/form-sign-up';

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

            <FormSignUp />

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