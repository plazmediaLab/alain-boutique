/**@jsx jsx */
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import ListItem from './list-item';

export default function ProductsSalesList({ list }){

  const [expanded, setExpanded] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  const productMode = mode => {
    return mode === 'NEW' ? 'text-green-500' : 'text-bluegray-100' 
  };
  const productStatus = status => {
    return status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-100' 
  };

  return (
    <ul 
      className="mt-3"
      css={css`
        li{
          display: grid;
          grid-template-columns: 1fr repeat(5, auto);
          align-items: center;
          column-gap: .25rem;
        }
        li:not(:last-child){
          margin-bottom: 5px;
        }
      `}
    >
      { list.map(item => (

        <li key={ item.id } className="bg-white shadow-container rounded-card p-2 text-title-item font-light">
          <section className="max-w-full overflow-hidden">
            <p>{ item.name }</p>
            <p className="text-description text-carbon-200 font-normal truncate pr-6">{ item.comment }</p>
          </section>
          <p className={`text-title-item font-medium ${item.sale ? 'text-green-500' : 'text-p_blue-500'}`}>{ formatter.format(item.price) }</p>
          <svg className={`w-5 h-5 ml-1 ${productStatus(item.status)}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          <svg className={`w-5 h-5 ml-1 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
          {/* <button 
            className="bg-background rounded-card"
            css={css`
              padding: .45rem;
            `}
          >
            <svg className="w-5 h-5 text-p_blue-300" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
          </button> */}
        </li>
      )) }
    </ul>
  );
};