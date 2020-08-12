import { jsx, css, keyframes } from '@emotion/core';

export const ripple = keyframes`
  from 0% to { 
      opacity: 1; 
      transform: scale(0); 
  } 
  20% { 
      opacity: .8; 
      transform: scale(5); 
  } 
  40% { 
      opacity: .6; 
      transform: scale(10); 
  } 
  60% { 
      opacity: .4; 
      transform: scale(15); 
  } 
  80% { 
      opacity: .2; 
      transform: scale(20); 
  } 
  100% { 
      opacity: 0; 
      transform: scale(25); 
  } 
`;

export const rippleContent = css`
  z-index: 5;

  span.ripple{
    position: absolute; 
    border-radius: 50%; 
    background-color: rgba(84, 128, 222, .27); 
    width: 20px; 
    height: 20px; 

    animation: ${ ripple } .7s ease-in-out; 
    opacity: 0;
  }
  &::after{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: transparent;
  }
`
export const titleItemContainer = css`
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  align-items: center;
  column-gap: .25rem;
`

/**
 * Actions --------------------------------------------------------
 */

export const handleClickToggleInfo = e => {
  // Create span element 
  let ripple = document.createElement("span"); 
  
  // Add ripple class to span 
  ripple.classList.add("ripple"); 
  
  
  // Add span to the button  
  e.target.appendChild(ripple); 
  
  // // // Get position of X 
  let X = e.clientX - e.target.offsetLeft; 
  
  // // // Get position of Y  
  let Y = e.clientY - e.target.offsetTop; 
  
  // // Position the span element 
  ripple.style.left = `${X}px`; 
  ripple.style.top = `${Y}px`; 

  // Remove span after 0.3s 
  setTimeout(() => { 
      ripple.remove(); 
  }, 700); 
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export const productMode = mode => {
  return mode === 'NEW' ? 'text-green-500' : 'text-bluegray-100' 
};
export const productStatus = status => {
  return status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-100' 
};