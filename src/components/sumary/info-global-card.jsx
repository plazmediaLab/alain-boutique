/**@jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import ItemList from './item-list';
import { skeletonBackground } from 'components/Resources/skeleton-style';
import UserContext from 'context/user/UserContext';

export default function InfoGlobalCard({ loading, setStep2 }){

  const [pzas, setPzas] = useState({});
  const [list, setList] = useState([]);

  const userContext = useContext(UserContext);
  const { products, groups } = userContext;

  useEffect(() => {
    if(products.length > 0){
      const newList = products.filter(x => x.sold === true);
      setPzas({
        sales: newList.length,
        total: products.length
      })
      setList(products);
      setStep2(true)
    }else{
      setList([]);
      setPzas({
        sales: 0,
        total: 0
      })
      setStep2(true)
    }
  }, [products]);

const handleData = itemName => {
    const newList = list.filter(x => x.group === itemName);

    let profit = 0;
    let total = 0;
    let accumulated = 0;
    let sales = list.filter(x => x.sold === true && x.group === itemName);

    newList.map(i => {
      profit = profit + (i.price - i.value);
      accumulated += i.value
      total += i.price
    });
    
    return {
      pzas: newList.length,
      profit,
      accumulated,
      total,
      sales: sales.length
    }
  };

  return (
    <>
      { loading ? (
        <div 
          className="rounded-container shadow-container mb-5 p-3 bg-white"
          css={skeletonBackground}
        >
          <div className="grid grid-cols-2 col-gap-3 mb-3">
            <div className="bg-p_blue-100 rounded-card h-16"></div>
            <div className="bg-p_blue-100 rounded-card h-16"></div>
          </div>
          <div className="bg-p_blue-100 rounded-card h-12"></div>
        </div>
      ) : (
        <section className="p-3 rounded-container shadow-container bg-white text-carbon-500">
          <aside className="grid grid-cols-2 col-gap-3 mb-4">
            <div className="bg-background rounded-card p-2 relative">
              <h1 className="text-label font-medium">Pzas. vendidas</h1>
              <p className="text-number-h1 text-blue-400 font-medium">{ pzas.sales }</p>
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
            <div className="bg-background rounded-card p-2 relative">
              <h1 className="text-label font-medium">Pzas. totales</h1>
              <p className="text-number-h1 text-blue-400 font-medium">{ pzas.total }</p>
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
        
          <ul
            css={css`
              > li:not(:last-child){
                margin-bottom: .5rem;
              }
              > li:last-child{
                margin-bottom: .15rem;
              }
            `}
          >
            { groups.map( (item, index) =>{

                return (
                  
                  <ItemList item={ item }  key={ index } data={ handleData(item.name) } />
        
                )
              }
            )}
          </ul>
        </section>
      ) }
    </>
  );
};