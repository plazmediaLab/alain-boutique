import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const Header = styled.header`
  grid-template-columns: auto auto 1fr;
`;

export default function InfoHead({ groups, products, activeGroup, activeGroupMethod, salesTap, setSalesTap }){

  const select = useRef(null);

  const productsSalesGroupCount = () => {
    const number = products.filter(item => item.status === 'ACTIVE' && item.group === activeGroup );
    return number.length;
  };
  const productsGroupCount = () => {
    const number = products.filter(item => item.group === activeGroup);
    return number.length;
  };

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const sales = () => {
    if(!salesTap){
      setSalesTap(true);
    }
  };
  const total = () => {
    if(salesTap){
      setSalesTap(false);
    }
  };

  return (
    <Header className="grid gap-2 text-sm items-center">
      <button 
        type="button"
        className={`${ salesTap ? 'tap-primary-blue-select' : 'tap-primary-blue-disable'}`}
        onClick={ () => sales() }
      ><span className="font-bold">{ productsSalesGroupCount() }</span> En venta</button>
      <button 
        type="button"
        className={`${ !salesTap ? 'tap-primary-blue-select' : 'tap-primary-blue-disable'}`}
        onClick={ () => total() }
      ><span className="font-bold">{ productsGroupCount() }</span> Totales</button>
      <select 
        className="py-2 pl-2 bg-transparent text-carbon-300"
        ref={ select }
        onChange={ () => activeGroupMethod(select.current.value) }
        value={ activeGroup !== '' ? activeGroup : null }
      >
        { groups.length === 0 ? <option value="" label="--- No hay grupos creados ---"></option> : null }
        { groups.map(item => (
      
          <option key={ item.id } value={ item.name }>{ capitalize(item.name.replace(/(_)/g, ' ')) }</option>
          
        ))}
      </select>
    </Header>
  );
};