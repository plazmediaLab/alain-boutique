import React, { useEffect } from "react"
// Custom Hooks
import useAuthUser from '../hooks/useAuthUser';
import useStatusAuth from '../hooks/useStatusAuth';
// Images
import isotype from '../images/isotype.svg'
import G from '../images/G-google-icon.svg'
import F from '../images/F-facebook-icon.svg'
import PlazmediaLogo from '../images/plazmedia-logo-ligth.svg'
// Components
import Layout from "../components/layout";


export default function Home() {

  const [ status, Login ] = useAuthUser();
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
          <section className="flex flex-col justify-center items-center bg-background relative min-h-screen">
            <img src={ isotype } alt="isotype" className="w-40 h-40"/>
            <h1 className="text-3xl font-semibold text-carbon-500">Alain Boutique</h1>
            <p className="text-carbon-200 text-sm">Sales manager 1.0.0</p>
            <p className="text-p_blue-500 mt-12 mb-6">Login with</p>
            <aside className="flex mb-20">
              <button
                className="btn-login mr-8"
                type="button"
                onClick={ Login }
              >
                <img src={ G } alt="Google iso"/>
              </button>
              <button
                className="btn-login ml-8"
                type="button"
                // onClick={ }
              >
                <img src={ F } alt="Google iso"/>
              </button>
            </aside>
            <footer className="flex justify-center items-center absolute bottom-0 mb-5">
              <p className="text-carbon-200 text-sm">Created by</p>&nbsp;&nbsp;
              <img src={ PlazmediaLogo } alt="Plazmedia imagotype"/>
            </footer>
          </section>
        </Layout>
      )}
      { status ? <h1>Loading...</h1> : null }
    </>
  )
}