/**@jsx jsx */
import React, { useRef } from 'react';
import Switch from 'components/home/switch';
import { jsx, css } from '@emotion/core';

export default function InfoHead({ products, setFilter, groups, activeGroup, activeGroupMethod }){
  


  const select = useRef(null);

  const countActive   =   products.filter(x => x.status === 'ACTIVE' && x.group === activeGroup.name && !x.sold)
  const countTotal    =   products.filter(x => x.group === activeGroup.name && !x.sold)

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const setGroupSelect = nameGroup => {
    const a = groups.filter(x => x.name === nameGroup);
    activeGroupMethod({
      name: nameGroup,
      color: a[0].color
    })
  }

  return (
    <header
      className="grid gap-2 grid-flow-row text-sm items-center box-border"
    >
      <section 
        className="grid items-center text-carbon-300"
        css={css`
          grid-template-columns: auto 1fr;
        `}
      >
        <label htmlFor="selectGroup" className={`ml-2 w-4 h-4 inline-block rounded-full bg-${activeGroup.color}`}></label>
        <select 
          name="selectGroup"
          id="selectGroup"
          className="bg-transparent p-2 box-border overflow-hidden w-full truncate"
          ref={ select }
          onChange={ () => setGroupSelect(select.current.value) }
          disabled={ groups.length === 0 ? true : false }
        >
          {/* <option value="" label="--- Select a group ---"></option> */}
          { groups.length === 0 ? <option value="" label="--- No hay grupos creados ---" title="007"></option> : null }
          { groups.map(item => {
            return(
              <option 
                key={ item.id }
                value={ item.name }
                className="overflow-hidden w-full truncate"
                selected={ item.name === activeGroup.name ? true : false }
              >
                { capitalize(item.name.replace(/(_)/g, ' ')) }
              </option>
              
            )}
          )}
        </select>
      </section>
      
      <Switch countActive={ countActive } countTotal={ countTotal } setFilter={ setFilter } />

    </header>
  );
};