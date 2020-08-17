import React from 'react';

export default function LineFooter(){
  return (
    <section
      className="fixed bottom-0 w-full h-1 grid grid-flow-col shadow-container"
    >
      <div className="bg-red-500 border border-red-500"/>
      <div className="bg-orange-500 border border-orange-500"/>
      <div className="bg-yellow-500 border border-yellow-500"/>
      <div className="bg-green-500 border border-green-500"/>
      <div className="bg-teal-500 border border-teal-500"/>
      <div className="bg-blue-500 border border-blue-500"/>
      <div className="bg-indigo-500 border border-indigo-500"/>
      <div className="bg-purple-500 border border-purple-500"/>
      <div className="bg-pink-500 border border-pink-500"/>

    </section>
  );
};