import React, { useState } from 'react';
import ListItem from './list-item';

export default function ProductsSalesList({ list }){

  const [expanded, setExpanded] = useState(false);

  return (
    <ul className="mt-3">
      { list.map(item => (

        <ListItem item={ item } expanded={expanded} setExpanded={setExpanded} key={ item.id } />

      )) }
    </ul>
  );
};