/** @jsx jsx */
import React, { useRef, useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';

export default function InfoHead({ products, setFilter, groups, activeGroup, activeGroupMethod }){

  // TODO · Cambio de botones a Switch 08/08/2020 

  const button1 = useRef(null);
  const button2 = useRef(null);
  const select = useRef(null);
  
  const countActive   =   products.filter(x => x.status === 'ACTIVE' && x.group === activeGroup)
  const countTotal    =   products.filter(x => x.group === activeGroup  && !x.sale)

  const handleClick = e => {
    button1.current.classList.remove('on');
    button2.current.classList.remove('on');

    e.target.classList.add('on');
    setFilter(e.target.value)
  };

    function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <header 
      className="grid gap-2 grid-flow-row text-sm items-center box-border"
    >
      <section className="flex items-center text-carbon-300">
        <label htmlFor="selectGroup">
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </label>
        <select 
          id="selectGroup"
          className="bg-transparent p-2 box-border overflow-hidden w-full truncate"
          ref={ select }
          onChange={ () => activeGroupMethod(select.current.value) }
          // // value={  }
          selected={ activeGroup !== '' ? activeGroup : null } 
        >
          {/* <option value="" label="--- Select a group ---"></option> */}
          { groups.length === 0 ? <option value="" label="--- No hay grupos creados ---" title="007"></option> : null }
          { groups.map(item => (
        
            <option 
              key={ item.id }
              value={ item.name }
              className="overflow-hidden w-full truncate"
            >
              { capitalize(item.name.replace(/(_)/g, ' ')) }
            </option>
            
          ))}
        </select>
      </section>
      <section 
        className="bg-p_blue-100 rounded-full p-1 grid grid-cols-2 col-gap-2 items-center justify-between"
      >
        <button 
          ref={ button1 }
          type="button"
          className={`btn-header off on`}
          value="active"
          onClick={ e => handleClick(e) }
        ><span className="font-bold">{ countActive.length }</span> En venta</button>
        <button 
          ref={ button2 }
          type="button"
          className={`btn-header off`}
          value="total"
          onClick={ e => handleClick(e) }
          ><span className="font-bold">{ countTotal.length }</span> Total</button>
      </section>
    </header>
  );
};