import React from 'react';

export default function GroupList({ groups }){

  console.log(groups);

  return (
    <section className="bg-bluegray-200 p-2 rounded border-t-8 border-bluegray-300 flex items-center text-bluegray-500">
      <select 
        name="groupList"
        id="groupList"
        className="p-2 flex-1 bg-transparent"
      >
        <option value="" label="--- Selecciona un grupo ---"></option>
        { groups.map(item => (
          <option value={ item }>{ item }</option>
        )) }
      </select>
      <button
        type="button"
        title="Crear un nuevo grupo"
        className="ml-4 bg-gray-300 p-2 rounded shadow-sm border border-gray-400"
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg>
      </button>
    </section>
  )
};