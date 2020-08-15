/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

export default function ItemList({ item, color }){

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <li
      className={`p-3 rounded-card shadow-item border-l-4 mb-2 border-${ color }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-carbon-500 text-description font-medium">{ item.group }</h2>
        <span className="bg-background text-p_blue-500 text-label inline-block rounded-full px-2">Pzas. { item.piezas }</span>
      </div>
      <section 
        className="text-label text-carbon-200 grid grid-cols-4 col-gap-2 justify-between"
        css={css`
          grid-template-columns: repeat(3, 1fr) auto;
          
          p{
            margin-top: .15rem;
            margin-bottom: .15rem;
          }
        `}
      >
        <div className="self-start">
          <p className={`text-${ color }`}>Ganancia</p>
          <p className={`text-white bg-${color} px-2 inline-block rounded-full`}>{ formatter.format(item.ganancia) }</p>
        </div>
        <div  className="text-center">
          <p>Acumulado</p>
          <p className={`text-${color} px-2 inline-block`}>{ formatter.format(item.ganancia) }</p>
        </div>
        <div  className="text-center">
          <p>total</p>
          <p className={`text-${color} px-2 inline-block`}>{ formatter.format(item.ganancia) }</p>
        </div>
        <div className="text-right">
          <p>Pzas. vend.</p>
          <p className={`text-${color} px-2 inline-block text-center w-full`}>{ formatter.format(item.ganancia) }</p>
        </div>
      </section>
    </li>
  );
};