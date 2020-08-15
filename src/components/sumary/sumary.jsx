import React, { useState, useEffect } from 'react';
import InfoTopCard from './info-top-card';
import InfoGlobalCard from './info-global-card';


export default function Sumary(){

  const [loading, setLoading] = useState(true);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);

  useEffect(() => {
    if(step1 && step2){
      setLoading(false);
    }
  }, [step1, step2]);

  return (
    <>

      <InfoTopCard loading={ loading } setStep1={ setStep1 } />

      <InfoGlobalCard loading={ loading } setStep2={ setStep2 } />
      
    </>
  );
};