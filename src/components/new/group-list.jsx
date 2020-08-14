/**@jsx jsx */
import { useContext, useRef } from 'react';
import UserContext from '../../context/user/UserContext';
import ModalItem from '../Resources/modal-item';
import NewGroup from './new-group';
import useDbMethods from '../../hooks/useDbMethods';
import { jsx, css } from '@emotion/core';

export default function GroupList(){

  const select = useRef(null);

  const userContext = useContext(UserContext);
  const { groups, activeGroup, activeGroupMethod, openModal } = userContext;

  const { deleteGroup } = useDbMethods();

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
    <section className="flex items-center mb-4 relative">

      <ModalItem>
        <NewGroup />
      </ModalItem>

      <section
        css={css`
          background: #ECF0F3;
          border: 1px solid #FFFFFF;
          box-shadow: -3px -3px 10px #FFFFFF, 3px 3px 6px #D1D9E6, inset -2px -2px 9px #FFFFFF, inset 5px 5px 10px rgba(209, 217, 230, 0.5);
          border-radius: 10px;
          padding: .1rem;
          padding-right: .6rem;
          z-index: 6;
        `}
        className="flex items-center w-full mr-2"
      >
        { groups.length > 0 ? (
          <button
            type="button"
            title="Crear un nuevo grupo"
            className="bg-transparent p-3"
            onClick={ () => deleteGroup(activeGroup.name) }
          >
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        ) : null }
        
        <select 
          name="groupList"
          id="groupList"
          className="p-2 pl-1 bg-transparent block flex-1 overflow-hidden w-full truncate text-title-item text-bluegray-300"
          ref={ select }
          onChange={ () => setGroupSelect(select.current.value) }
          disabled={ groups.length > 0 ? false : true }
          css={css`
            &:disabled{
              color: #BFCBD1; 
            }
          `}
        >
          { groups.length === 0 ? <option defaultValue="" label="--- No hay grupos creados ---"></option> : '' }
          { groups.map(item => (
        
            <option key={ item.id } defaultValue={ item.name } value={ item.name } selected={ item.name === activeGroup.name ? true : false }>
              { capitalize(item.name.replace(/(_)/g, ' ')) }
            </option>
            
          )) }
        </select>
      </section>

      <button
        type="button"
        title="Crear un nuevo grupo"
        css={css`
          background: #ECF0F3;
          box-shadow: -10px -10px 15px #FFFFFF, 7px 7px 15px #D1D9E6;
          border-radius: 10px;
          z-index: 5;
        `}
        className="p-3 text-bluegray-300"
        onClick={ openModal }
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path></svg>
      </button>
    </section>
  )
};