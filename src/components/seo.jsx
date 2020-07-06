import React from 'react';
import { Helmet } from 'react-helmet';
// Favicon
import Favicon from '../images/isotype-isotype-color-32px.png'

export default function Seo(){
  return (
    <Helmet>
      <title>Alain Boutique</title>
      <link rel="icon" type="image/png" href={ Favicon } /> 
    </Helmet>
  );
};