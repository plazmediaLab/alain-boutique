import React, { useEffect, useContext } from "react"
import { Link } from 'gatsby';
// Context 
import UserContext from '../context/user/UserContext';
// Images
import isotype from '../images/isotype.svg'
//Styles Components
import { MainContainer } from '../components/Styled Components/index';
// Components
import Layout from "../components/layout";
import ButtonsLoginGF from "../components/login/buttons-login-gf";
import FormLogin from "../components/login/form-login";
import FooterIndex from "../components/footer-index";

export default function Home(props) {

  const userContext = useContext(UserContext);
  const { authState } = userContext;

  useEffect(() => {
    authState();
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

            <FormLogin />

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