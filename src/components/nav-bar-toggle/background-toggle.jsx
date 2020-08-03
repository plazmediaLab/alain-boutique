import React from 'react';

export default function BackgroundToggle({ reference, openToggle }){
  return (
    <div 
      ref={ reference }
      onClick={ openToggle }
      className={`bg-toggle`}
    ></div>
  );
};