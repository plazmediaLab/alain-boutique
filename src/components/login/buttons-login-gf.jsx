import React from 'react';
// Images
import G from '../../images/G-google-icon.svg';
import F from '../../images/F-facebook-icon.svg';
// Custom Hooks
import useAuthMethods from '../../hooks/useAuthMethods';

export default function ButtonsLoginGF(){
 
  const { googleAuth, facebookAuth } = useAuthMethods();

  return (
    <>
      <p className="text-p_blue-500 mt-6 mb-6 text-sm">Inicia sesión con</p>
      <section className="flex mb-4">
        <button
          className="btn-login mr-8"
          type="button"
          onClick={ () => googleAuth() }
        >
          <img src={ G } alt="Google iso" className="h-6"/>
        </button>
        <button
          className="btn-login ml-8"
          type="button"
          onClick={ () => facebookAuth() }
        >
          <img src={ F } alt="Google iso" className="h-6"/>
        </button>
      </section>
      {/* { status ? <h1>Loading...</h1> : null } */}
    </>
  );
};