/**@jsx jsx */
import React, { useContext, useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import UserContext from 'context/user/UserContext';
import { skeletonBackground } from 'components/Resources/skeleton-style';

export default function InfoTopCard({ loading, setStep1 }){

  const [profit, setProfit] = useState(0);
  const [accumulated, setAccumulated] = useState(0);
  const [total, setTotal] = useState(0);

  const userContext = useContext(UserContext);
  const { products } = userContext;

  useEffect(() => {
    if(products.length > 0){
      let countTotal = 0;
      let countAccumulated = 0;

      products.map(i => {
        countTotal += i.price;
        countAccumulated += i.value;
      });
      setAccumulated(countAccumulated);
      setTotal(countTotal);

      let countProfit = 0;

      const saleProducList = products.filter(x => x.sold === true);
      saleProducList.map(i => {
        countProfit = countProfit + (i.price - i.value);
      })
      setProfit(countProfit);

      setStep1(true);
    }else{
      setStep1(true);
    }
  }, [products]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <>
      { loading ? (
        <div 
          className="rounded-container shadow-container mb-5 p-3 bg-white flex"
          css={skeletonBackground}
        >
          <span className="w-10 h-10 bg-p_blue-100 block rounded-full mr-2"></span>
          <div className="flex-1 grid grid-cols-3 col-gap-2">
            <div className="bg-p_blue-100 rounded-card"></div>
            <div className="bg-p_blue-100 rounded-card"></div>
            <div className="bg-p_blue-100 rounded-card"></div>
          </div>
        </div>
      ) : (
        <section 
          className="grid col-gap-3 p-3 rounded-container shadow-container mb-5 items-center justify-center leading-6 bg-white"
          css={css`
            grid-template-columns: auto repeat(3, 1fr);
          `}
        >
          <div className="p-2 rounded-full text-green-500 bg-green-200">
            <svg viewBox="0 0 20 20" fill="currentColor" className="trending-up w-6 h-6"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path></svg>
          </div>
          <div className="text-number-h1 -mt-3">
            <span className="text-label uppercase text-carbon-200">Ganancia</span>
            <p className="font-bold text-green-500">{ formatter.format(profit) }</p>
          </div>
          <div className="text-center -mt-2">
            <span className="text-label uppercase text-carbon-200 inline-block pt-1">Acumulado</span>
            <p className="text-title-item font-bold text-pink-500">{ formatter.format(accumulated) }</p>
          </div>
          <div className="text-center -mt-2">
            <span className="text-label uppercase text-carbon-200">total</span>
            <p className="text-title-item font-bold text-purple-500">{ formatter.format(total) }</p>
          </div>
        </section>
      )}
    </>
  );
};