import React, { useContext } from 'react';
// Context
import UserContext from '../../context/user/UserContext';
// Images
import G from '../../images/G-google-icon.svg'
import F from '../../images/F-facebook-icon.svg'

export default function ButtonsLoginGF(){

  // Context
  const userContext = useContext(UserContext);
  const { googleAuth } = userContext;  

  return (
    <>
      <p className="text-p_blue-500 mt-6 mb-6 text-sm">Inicia sesión con</p>
      <section className="flex mb-4">
        <button
          className="btn-login mr-8"
          type="button"
          onClick={ googleAuth }
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
      </section>
      {/* { status ? <h1>Loading...</h1> : null } */}
    </>
  );
};