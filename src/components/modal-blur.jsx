/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import FormLogin from './login/form-login';

export default function ModalBlur({ closeModal }){

  return (
    <aside
      className="modal-blur"
    >
      <div
        className="w-full h-full bg-transparent z-10 absolute top-0 left-0"
        onClick={ closeModal }
      />
      <div
        className="modal-blur-content grid items-center bg-white rounded-card shadow-xl p-3 z-20"
        css={css`
          position: absolute;
          left: calc(50% - 40%);
          margin: 0 auto;
          width: 80%;
          
          @media (min-width: 640px){
            width: 24rem;
            left: calc(50% - 12rem);
          }
        `}
      >
        
        <FormLogin />

      </div>
    </aside>
  );
};