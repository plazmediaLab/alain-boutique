/**@jsx jsx */
import React, { useContext } from 'react';
import FormNewProduct from './form-new-product';
import GroupList from './group-list';
import UserContext from 'context/user/UserContext';
import { jsx, css } from '@emotion/core';
// Images 
import CreateGroupImg from 'images/created_group_img.png'

export default function NewProduct(){

  const userContext = useContext(UserContext);
  const { groups } = userContext;

  return (
    <>
      <GroupList/>

      { groups.length > 0 ? (
        
        <FormNewProduct/>

      ) : (
        <section className="pt-4 sm:pt-20">
          <img src={ CreateGroupImg } alt="Created group for add product" 
            css={css`
              width: 280px;
              margin: 0 auto;
              
              @media (min-width: 640px){
                width: 400px;
              }
            `}
          />
        </section>
      )}
    </>
  );
};