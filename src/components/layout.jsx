import React, { useEffect } from 'react';
import Seo from './seo';
import tw from 'tailwind.macro';

const PageContainer = tw.div`
    bg-gray-200 w-1/2 m-auto p-2
`;

export default function Layout({ children }){
  return (
    <>
      <Seo/>
      <PageContainer>
        { children }
      </PageContainer>
    </>
  );
};