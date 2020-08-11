/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import ItemsSales from 'components/sales/items-sales';
import ListItem from './list-item';


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
        <ListItem item={ item } filter={ filter } />
      )) }
    </ul>
  );
};