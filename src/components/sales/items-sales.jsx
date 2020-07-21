import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';

export default function ItemsSales({ products }){

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  const statusActive = (status) => {
    return status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-300'
  };
  
  useEffect(() => {
    if(products.length > 0){
      const formatted = moment.utc(products[0].date.seconds*1000).fromNow();
      console.log(formatted);
    }
  }, [/* dependencia */]);

  return (
    <ul>
      { products.map( item => (
          <details key={ item.id }>
            <summary className="flex items-center py-2 cursor-pointer">
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
            <div className="bg-teal-200 text-sm pl-6">
              <p>{ item.comment }</p>
              <p>{ item.group }</p>
              <p>{ moment.utc(item.date.seconds*1000).fromNow() }</p>
            </div>
          </details>
        ))
      }
    </ul>
  );
};