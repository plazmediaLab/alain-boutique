import React from 'react';
// Images
import PlazmediaLogo from '../images/plazmedia-logo-ligth.svg';

export default function FooterIndex(){
  return (
    <footer className="flex justify-center items-center">
      <p className="text-carbon-200 text-sm">Created by</p>&nbsp;&nbsp;
      <img src={ PlazmediaLogo } alt="Plazmedia imagotype"/>
    </footer>
  );
};