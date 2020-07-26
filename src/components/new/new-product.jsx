import React, { useState } from 'react';
import FormNewProduct from './form-new-product';
import GroupList from './group-list';

export default function NewProduct(){

  // const userContext = useContext(UserContext);
  // const { groups } = userContext;

  return (
    <>
      <GroupList/>
      <FormNewProduct/>
    </>
  );
};