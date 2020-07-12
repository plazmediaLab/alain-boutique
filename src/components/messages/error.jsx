import React from 'react';

export default function Error({ message, sm_w = '', mb = '', mt = '' }){
  return (
    <p className={`bg-red-200 border-b-2 border-red-400 text-red-900 p-3 w-full text-center text-xs ${mb} ${mt} sm:${sm_w}`}>
      { message }
    </p>
  );
};