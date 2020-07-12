import React, { useEffect } from "react"
import { Link } from 'gatsby';
// Custom Hooks
import useStatusAuth from '../hooks/useStatusAuth';
// Images
import isotype from '../images/isotype.svg'
//Styles Components
import { MainContainer } from '../components/Styled Components/index';
// Components
import Layout from "../components/layout";
import ButtonsLoginGF from "../components/login/buttons-login-gf";
import FromLogin from "../components/login/form-login";
import FooterIndex from "../components/footer-index";

export default function Home() {

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
            <img src={ isotype } alt="isotype" className="w-32 h-32 sm:w-40 sm:h-40"/>
            <h1 className="text-2xl font-semibold text-carbon-500 sm:text-3xl">Alain Boutique</h1>
            <p className="text-carbon-200 text-sm">Sales manager 1.0.0</p>

            <ButtonsLoginGF />

            <FromLogin />

            <hr className="mb-4 border-carbon-100 w-full sm:w-64"/>
            <p className="text-xs text-carbon-200 w-64 text-center">
              Si no cuentas con una cuenta activa, puedes <Link to="/sign-up" className="text-p_blue-500">registrarte con tu corre</Link>
            </p>

            <FooterIndex />
          </MainContainer>
        </Layout>
      )}
    </>
  )
}