import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

export default function ItemsSales({ products }){

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  const statusActive = (status) => {
    console.log(status);
    return status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-300'
  };

  return (
    <ul>
      { products.map( item => (
          <details key={ item.id }>
            <summary className="flex items-center p-2 cursor-pointer bg-white shadow-md">
              <svg className={`w-4 h-4 mr-2 ${statusActive(item.status)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
              <h2 className="flex-1 text-xl font-light text-carbon-500 pr-2">{ item.name }</h2>
              <p className="flex items-center bg-teal-500 text-white rounded-full pl-1 pr-2" title="valor">
                <svg className="w-5 h-5 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                { formatter.format(item.value) }</p>
              <p className="flex items-center bg-pink-500 text-white rounded-full pl-1 pr-2 ml-2" title="precio">
                <svg className="w-5 h-5 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                { formatter.format(item.price) }
              </p>
            </summary>
            <div className="bg-p_blue-500 text-sm pl-8 pr-2 py-2 rounded-bl-lg rounded-br-lg border border-t-0 border-p_blue-600 text-white shadow-md">
              <p><span className="font-bold">Descrip:</span> { item.comment }</p>
              <div className="grid grid-rows-2 gap-2 grid-flow-col mt-2 sm:mt-4 sm:grid-rows-1">
                <section className="text-xs flex items-center">
                  <p className="bg-p_blue-300 rounded-full py-1 px-2 mr-2 flex">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    { item.group }
                  </p>
                  <p className="bg-p_blue-300 rounded-full py-1 px-2 flex">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    { moment.utc(item.date.seconds*1000).fromNow() }
                  </p>
                </section>
                <section className="grid grid-cols-3 gap-2 justify-start sm:justify-end">
                  <button
                    className="btn-gen text-red-600"
                  >Eliminar</button>
                  <button
                    className="btn-gen text-yellow-600" 
                  >Editar</button>
                  <button
                    className="btn-gen text-p_blue-500"
                  >En venta</button>
                </section>
              </div>
            </div>
          </details>
        ))
      }
    </ul>
  );
};