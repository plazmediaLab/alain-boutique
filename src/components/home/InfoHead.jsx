import React, { useRef } from 'react';
import Switch from 'components/home/switch';

export default function InfoHead({ products, setFilter, groups, activeGroup, activeGroupMethod }){
  


  const select = useRef(null);

  const countActive   =   products.filter(x => x.status === 'ACTIVE' && x.group === activeGroup)
  const countTotal    =   products.filter(x => x.group === activeGroup  && !x.sale)

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
    <>
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
            onChange={ () => setGroupSelect(select.current.value) }
          >
            {/* <option value="" label="--- Select a group ---"></option> */}
            { groups.length === 0 ? <option value="" label="--- No hay grupos creados ---" title="007"></option> : null }
            { groups.map(item => {
              return(
                <option 
                  key={ item.id }
                  value={ item.name }
                  className="overflow-hidden w-full truncate"
                  selected={ item.name === activeGroup ? true : false }
                >
                  { capitalize(item.name.replace(/(_)/g, ' ')) }
                </option>
                
              )}
            )}
          </select>
        </section>
        
        <Switch countActive={ countActive } countTotal={ countTotal } setFilter={ setFilter } />

      </header>
    </>
  );
};