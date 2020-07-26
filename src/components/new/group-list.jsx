import React,{ useContext, useEffect, useRef } from 'react';
import UserContext from '../../context/user/UserContext';
import ModalItem from '../Resources/modal-item';
import NewGroup from './new-group';
import useDbMethods from '../../hooks/useDbMethods';

export default function GroupList(){

  const select = useRef(null);

  const userContext = useContext(UserContext);
  const { groups, activeGroup, activeGroupMethod, openModal } = userContext;

  const { deleteGroup } = useDbMethods();

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <section className="bg-bluegray-200 p-2 rounded border-t-8 border-bluegray-300 flex items-center text-bluegray-500">

      <ModalItem>
        <NewGroup />
      </ModalItem>

      <div className="relative flex-1 bg-bluegray-100 items-center flex pr-2 rounded">
        { groups.length > 0 ? (
          <button
            type="button"
            title="Crear un nuevo grupo"
            className="bg-transparent p-3"
            onClick={ () => deleteGroup(activeGroup) }
          >
            <svg className="w-4 h-4 text-red-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        ) : null }
        
        <select 
          name="groupList"
          id="groupList"
          className="p-2 pl-1 bg-transparent block flex-1"
          ref={ select }
          onChange={ () => activeGroupMethod(select.current.value) }
          value={ activeGroup !== '' ? activeGroup : null }
        >
          { groups.length === 0 ? <option value="" label="--- No hay grupos creados ---"></option> : null }
          { groups.map(item => (
        
            <option key={ item.id } value={ item.name }>{ capitalize(item.name.replace(/(_)/g, ' ')) }</option>
            
          )) }
        </select>
      </div>
      <button
        type="button"
        title="Crear un nuevo grupo"
        className="ml-2 bg-gray-200 p-2 rounded shadow-sm border border-gray-400"
        onClick={ openModal }
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg>
      </button>
    </section>
  )
};