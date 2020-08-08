import React from 'react';
import { Link } from 'gatsby';
// Components
import Layout from "components/layout";
import FooterIndex from 'components/footer-index';
import FormSignUp from 'components/sign-up/form-sign-up';

export default function SignUp(){

  return(
    <Layout>
      <section className="flex flex-col justify-center items-center bg-background relative min-h-screen px-16">

        <h1 className="text-2xl font-semibold text-carbon-500 sm:text-3xl m-8">Registrate</h1>

        <FormSignUp />

        <hr className="my-4 border-carbon-100 w-full sm:w-64"/>
        <p className="text-carbon-200">Si ya tienes una cuenta</p>
        <Link to="/" className="text-p_blue-500">Inicia sesión</Link>
        
        <FooterIndex />
      </section>
    </Layout>
  )
};