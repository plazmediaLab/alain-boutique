/**@jsx jsx */
import React, { useState, useRef } from 'react';
import { btnAnimateIcon } from './styled-css-class';
import { jsx, css } from '@emotion/core';

export default function BtnToggle({ reference, openToggle }){

  

  return (
    <button 
      ref={ reference }
      type="button"
      className="relative z-50 bg-teal-500"
      css={ btnAnimateIcon }
      onClick={ openToggle }
    >
      <span/>
    </button>
  );
};