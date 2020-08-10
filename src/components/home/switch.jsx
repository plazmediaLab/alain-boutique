/**@jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';

export default function Switch({ countActive, countTotal, setFilter }){

  const [checketSwitch, setChecketSwitch] = useState(false);

  const handleChecket = () => {
    setChecketSwitch(!checketSwitch);
    if(!checketSwitch){
      setFilter('total');
    }else{
      setFilter('active');
    }
  };

  return (
    <div 
      className="relative block h-full rounded-full bg-p_blue-100 text-p_blue-500 cursor-pointer"
      css={css`
        span.on{
          left: calc(50% - .25rem);
        }
        &:active .switch{
          transform: scaleX(1.5);
        }
      `}
      onClick={ handleChecket }
    >
      <span 
        className={`switch ${checketSwitch ? 'on' : ''} absolute bg-p_blue-500 shadow-blue rounded-full`}
        css={css`
          top: .25rem;
          left: .25rem;
          width: 50%;
          height: calc(100% - .5rem);
          transition: all .2s ease-out;
          transform-origin: ${checketSwitch ? 'right' : 'left'};
        `}
      ></span>
      <div 
        className="relative z-10 p-2 text-xs w-full h-full rounded-full grid grid-cols-2 col-gap-2 justify-around items-center text-center"
      >
        <span
          className={`${checketSwitch ? '' : 'text-white'}`}
          css={css`
            transition: color .2s ease-in-out; 
          `}
        ><span className="font-bold">{ countActive.length }</span> En venta</span>
        <span
          className={`${checketSwitch ? 'text-white' : ''}`}
          css={css`
            transition: color .2s ease-in-out; 
          `}
        ><span className="font-bold">{ countTotal.length }</span> Total</span>
      </div>
    </div>
  );
};