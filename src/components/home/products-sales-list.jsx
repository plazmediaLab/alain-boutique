import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import UserContext from '../../context/user/UserContext';

const LiItem = styled.li`
  grid-template-columns: auto 1fr auto auto;
`;
const Comment = styled.p`
  @media (min-width: 640px) {
    width: 70%!important;
  }
`;

export default function ProductsSalesList({ products }){

  const [list, setlist] = useState([]);

  const userContext = useContext(UserContext);
  const { activeGroup } = userContext;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  const productMode = mode => {
    return mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200' 
  };

  const productsSalesGroupCount = () => {
    const number = products.filter(item => item.status === 'ACTIVE' && item.group === activeGroup );
    setlist(number);
  };

  useEffect(() => {
    productsSalesGroupCount();
  }, [activeGroup]);

  return (
    <ul className="mt-3">
      { list.map(item => (
        <LiItem className="bg-white w-full py-2 px-3 text-carbon-500 text-lg grid gap-2 items-center shadow-sm mb-1">
          {/* <svg className={`w-4 h-4 mr-2 ${statusActive(item.status)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg> */}
          <svg className={`w-4 h-4 mr-2 text-yellow-500`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
          <div>
            <p>{ item.name }</p>
            <Comment className="text-sm text-carbon-200 truncate w-56">{ item.comment }</Comment>
          </div>
          <p className="text-base text-p_blue-500">{ formatter.format(item.price) }</p>
          <svg className={`w-5 h-5 ml-1 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
        </LiItem>
      )) }
    </ul>
  );
};