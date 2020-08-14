/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

export default function InfoTopCard(){

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <section 
      className="grid col-gap-3 p-3 rounded-container shadow-container mb-5 items-center justify-center leading-6 bg-white"
      css={css`
        grid-template-columns: auto auto repeat(2, 1fr);
      `}
    >
      <div className="p-2 rounded-full text-green-500 bg-green-200">
        <svg viewBox="0 0 20 20" fill="currentColor" className="trending-up w-6 h-6"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path></svg>
      </div>
      <div className="text-number-h1 -mt-3">
        <span className="text-label uppercase text-carbon-200">Ganancia</span>
        <p className="font-bold text-green-500">{ formatter.format(1250) }</p>
      </div>
      <div className="text-center -mt-2">
        <span className="text-label uppercase text-carbon-200 inline-block pt-1">Acumulado</span>
        <p className="text-title-item font-bold text-pink-500">{ formatter.format(1250) }</p>
      </div>
      <div className="text-center -mt-2">
        <span className="text-label uppercase text-carbon-200">total</span>
        <p className="text-title-item font-bold text-purple-500">{ formatter.format(1250) }</p>
      </div>
    </section>
  );
};