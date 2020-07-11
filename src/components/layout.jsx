import React from 'react';
import Seo from './seo';

export default function Layout({ children }){
  return (
      <>
        <Seo/>
        <main className="min-h-screen">
          { children }
        </main>
      </>
  );
};