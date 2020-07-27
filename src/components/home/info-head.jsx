import React, { useRef } from 'react';
import styled from '@emotion/styled';

const Header = styled.header`
  grid-template-columns: auto auto 1fr;
`;

export default function InfoHead({ groups, activeGroup, activeGroupMethod, sales, totalSales }){

  const select = useRef(null);

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <Header className="grid gap-6 text-sm">
      <p className="col-auto text-p_blue-500 py-2"><span className="font-bold">{ sales }</span> En venta</p>
      <p className="col-auto text-carbon-200 py-2"><span className="font-bold">{ totalSales }</span> Totales</p>
      <select 
        className="py-2 pl-2 bg-transparent text-carbon-200"
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