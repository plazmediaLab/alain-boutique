import React from 'react';
// Images
import G from '../../images/G-google-icon.svg';
import F from '../../images/F-facebook-icon.svg';
// Custom Hooks
import useAuthMethods from '../../hooks/useAuthMethods';
import FetchingIcon from 'components/Resources/fetching-icon';

export default function ButtonsLoginGF(){
 
  const { loading, googleAuth, facebookAuth } = useAuthMethods();

  return (
    <>
      <p className="text-p_blue-500 my-3 text-sm">Inicia sesión con</p>
      <section className="grid grid-cols-2 justify-around mb-4 col-gap-10">
        <button
          className="btn-login shadow-btnsquare rounded-container w-20 h-12 flex items-center justify-center sm:w-24 sm:h-12"
          type="button"
          onClick={ () => googleAuth() }
          disabled={ loading ? true : false }
        >
          <img src={ G } alt="Google iso" className="h-6"/>
        </button>
        <button
          className="btn-login shadow-btnsquare rounded-container w-20 h-12 flex items-center justify-center sm:w-24 sm:h-12"
          type="button"
          onClick={ () => facebookAuth() }
          disabled={ loading ? true : false }
        >
          <img src={ F } alt="Google iso" className="h-6"/>
        </button>


      </section>


      { loading ? ( 
        <>
          <p className="text-bluegray-300 text-description mb-3 whitespace-no-wrap">Loading popup for login...</p> 
          <FetchingIcon strokeC='#5480DE' width="15" height='15' strokeWidth='1'/>
        </>
      ) : null }
      
    </>
  );
};