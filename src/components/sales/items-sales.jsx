import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import useDbMethods from '../../hooks/useDbMethods';

export default function ItemsSales({ products }){

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  const statusActive = status => {
    return status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-300'
  };
  const productMode = mode => {
    return mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200' 
  };

  const { activeProduct, deleteProduct } = useDbMethods();

  const unorderedList = useRef(null);

  useEffect(() => {
    let detailsList = unorderedList.current.querySelectorAll('details');
    detailsList.forEach(item => {
      item.querySelector('summary').addEventListener('click', () => {
        detailsList.forEach(x => {
          x.removeAttribute('open')
        })
      })
    })
  }, [/* dependencia */]);

  return (
    <ul ref={ unorderedList }>
      { products.map( item => (
          <details key={ item.id }>
            <summary className="flex items-center p-2 cursor-pointer bg-white shadow-md border-b border-bluegray-100">
              <svg className={`w-4 h-4 mr-2 ${statusActive(item.status)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
              <h2 className="flex-1 text-xl font-light text-carbon-500 pr-2">{ item.name }</h2>
              <p className="flex items-center text-sm font-medium text-pink-300" title="valor">
                { formatter.format(item.value) }
              </p>
              <p className="flex items-center text-sm font-medium text-p_blue-500 ml-2 pl-2 border-l border-bluegray-200" title="precio">
                { formatter.format(item.price) }
              </p>
              <svg className={`w-5 h-5 ml-1 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            </summary>
            <div className="bg-p_blue-500 text-sm pl-8 pr-2 py-2 border border-t-0 border-p_blue-600 text-white shadow-md">
              { item.comment ? <p><span className="font-bold">Descrip:</span> { item.comment }</p> : null}
              <div className={`${item.comment ? 'mt-2' : ''} grid grid-rows-2 gap-2 grid-flow-col ${item.comment ? 'sm:mt-4' : ''} sm:grid-rows-1`}>
                <section className="text-xs flex items-center">
                  <p className="bg-p_blue-300 rounded-full py-1 px-2 mr-2 flex items-center">
                    <svg className={`w-4 h-4 ${item.group ? 'mr-1' : 'text-p_blue-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    { item.group }
                  </p>
                  <p className="bg-p_blue-300 rounded-full py-1 px-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    { moment.utc(item.date.seconds*1000).fromNow() }
                  </p>
                </section>
                <section className="grid grid-cols-3 gap-2 justify-start sm:justify-end">
                  <button
                    className="btn-gen text-red-600"
                    onClick={ () => deleteProduct(item.id) }
                  >Eliminar</button>
                  <button
                    className="btn-gen text-yellow-600" 
                  >Editar</button>
                  { item.status === 'STOCK' ?
                    ( 
                      <button
                        className="btn-gen text-p_blue-500"
                        onClick={ () => activeProduct(item.id) }
                      >Activar venta</button>
                      ):
                    (
                      <button
                        className="btn-gen text-carbon-300"
                        onClick={ () => activeProduct(item.id) }
                      >A stock</button>
                    )
                  }
                </section>
              </div>
            </div>
          </details>
        ))
      }
    </ul>
  );
};