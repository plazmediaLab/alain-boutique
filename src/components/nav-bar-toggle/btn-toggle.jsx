/**@jsx jsx */
import { jsx } from '@emotion/core';
import { btnAnimateIcon } from './styled-css-class';

export default function BtnToggle({ reference, openToggle }){
  return (
    <button 
      ref={ reference }
      type="button"
      className="relative z-50 bg-teal-500 appearance-none focus:outline-none"
      css={ btnAnimateIcon }
      onClick={ openToggle }
    >
      <span/>
    </button>
  );
};