/**@jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user/UserContext';
import { jsx, css } from '@emotion/core';
import moment from 'moment';
import 'moment/locale/es';

export default function Sales(){

  const [list, setList] = useState([]);

  const userContext = useContext(UserContext);
  const { products, groups } = userContext;

  useEffect(() => {
    if(products.length > 0){
      setList(products.filter(x => x.sold === true));
    }
  }, [products]);

  const productMode = mode => {
    return mode === 'NEW' ? 'text-green-500' : 'text-bluegray-100' 
  };
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <ul
      css={css`
        > *:not(:last-child){
          margin-bottom: 5px;
        }
      `}
    >
      { list.map(item => {

        const colorTag = groups.find(x => x.name === item.group);
      
        return(
          <li 
            key={ item.id }
            className="grid items-center w-full shadow-container rounded-card bg-white px-3 pt-2 pb-3"
          > 
            <h2 className="text-title-item mb-2">{ item.name }</h2> 
            <section
              className="grid items-center justify-between text-description text-bluegray-400 whitespace-no-wrap font-bold mb-1"
              css={css`
                grid-template-columns: auto auto repeat(2, 1fr);
              `}
            >
              <svg className={`w-4 h-4 mr-2 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              <p className="mr-2"><span className="font-light">Precio: </span> { formatter.format(item.value) }</p>
              <p className="mr-2"><span className="font-light">Vendido en: </span> { formatter.format(item.price) }</p>
              <p className="text-right text-p_blue-500"><span className="font-light">Ganancia: </span> { formatter.format(item.price - item.value) }</p>
            </section>
            <section
              className={`grid items-center justify-end text-description text-bluegray-400 whitespace-no-wrap text-right w-full`}
              css={css`
                grid-template-columns: auto 1fr auto;
                span{
                  margin-left: .5rem;
                }
              `}
            >
              <p className="text-description text-bluegray-200 bg-background rounded-full px-2">{ moment.utc(item.soldDate.seconds * 1000).format('ll') }</p>
              <p>Grupo: <span className={`font-bold truncate overflow-hidden text-${colorTag.color}`}>{ capitalize(item.group.replace(/(_)/g, ' ')) }</span></p>
              <span className={`w-3 h-3 rounded-full block bg-${colorTag.color}`}/>
            </section>
          </li>
        ) 
      })}
    </ul>
  );
};