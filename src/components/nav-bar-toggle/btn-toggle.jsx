/**@jsx jsx */
import React, { useState, useRef } from 'react';
import { btnAnimateIcon } from './styled-css-class';
import { jsx, css } from '@emotion/core';

export default function BtnToggle({ openToggle }){

  const [active, setActive] = useState(false);

  let btnToggle = useRef(null);

  const btnToggleAction = () => {
    openToggle()
    let item = btnToggle.current.querySelector('span');
    if(!active){
      setActive(true);
      console.log('On...');
      item.classList.add('active');
    }else{
      setActive(false);
      console.log('Off...');
      item.classList.remove('active');
    }
  };

  return (
    <button 
      ref={ btnToggle }
      type="button"
      className="relative z-50 bg-teal-500"
      css={ btnAnimateIcon }
      onClick={ () => btnToggleAction() }
    >
      <span/>
    </button>
  );
};