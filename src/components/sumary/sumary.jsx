/**@jsx jsx */
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import InfoTopCard from './info-top-card';


export default function Sumary(){

  const colors = [
    'red-500',
    'orange-500',
    'green-500',
    'teal-500',
    'blue-500',
    'indigo-500',
    'purple-500',
    'pink-500',
  ];
  const list = [
    {
      group: 'Ropa de Evan',
      ganancia: 200,
      acumulado: 600,
      total: 800,
      piezas: 12,
      vendidas: 15,
    },
    {
      group: 'Ropa para niña',
      ganancia: 150,
      acumulado: 950,
      total: 1100,
      piezas: 30,
      vendidas: 5,
    },
    {
      group: 'Nueva',
      ganancia: 50,
      acumulado: 300,
      total: 350,
      piezas: 25,
      vendidas: 6,
    },
    {
      group: 'Invierno',
      ganancia: 1200,
      acumulado: 3530,
      total: 4730,
      piezas: 150,
      vendidas: 40,
    },
    {
      group: 'Deportiva',
      ganancia: 30,
      acumulado: 540,
      total: 570,
      piezas: 63,
      vendidas: 40,
    },
  ];

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <>

      <InfoTopCard />

      <section className="p-3 rounded-container shadow-container bg-white text-carbon-500">
        <aside className="grid grid-cols-2 col-gap-3 mb-4">
          <div className="bg-background rounded-card p-3 relative">
            <h1 className="text-label font-medium">Pzas. vendidas</h1>
            <p className="text-number-h1 text-blue-400 font-medium">{ 360 }</p>
            <svg 
            css={css`
              position: absolute;
              top: 10%;
              right: 5%;
              height: 80%;
              opacity: .08;
            `}
            className="text-p_blue-500 badge-check" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          </div>
          <div className="bg-background rounded-card p-3 relative">
            <h1 className="text-label font-medium">Pzas. totales</h1>
            <p className="text-number-h1 text-blue-400 font-medium">{ 360 }</p>
            <svg 
            css={css`
              position: absolute;
              top: 10%;
              right: 5%;
              height: 80%;
              opacity: .08;
            `}
            className="text-p_blue-500 clipboard-list" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
          </div>
        </aside>

        <ul>
          { list.map( (item, index) =>{

            const color = colors[getRandomInt(1, 8)];
            return (
              <li
                key={ index }
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
            )}

          )}
        </ul>
      </section>
    </>
  );
};