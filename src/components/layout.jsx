import React from 'react';
import Seo from './seo';
import tw from 'tailwind.macro';

const PageContainer = tw.div`
    bg-gray-200 text-xl w-1/2 m-auto text-p_blue-500
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