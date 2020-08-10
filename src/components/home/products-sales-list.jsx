/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import ItemsSales from 'components/sales/items-sales';


export default function ProductsSalesList({ list, filter }){
  return (
    <ul 
      className="mt-3"
      css={css`
        > *:not(:last-child){
          margin-bottom: 5px;
        }
      `}
    >
      { list.map(item => (
        <ItemsSales item={ item } filter={ filter } />
      )) }
    </ul>
  );
};