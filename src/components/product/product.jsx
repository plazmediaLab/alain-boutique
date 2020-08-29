import React, { useContext, useEffect, useState } from 'react';
import UserContext from 'context/user/UserContext';
import slugify  from 'slugify';

export default function Product({ productSlug }){

  const [product, setProduct] = useState({});

  const userContext = useContext(UserContext);
  const { products } = userContext;

  useEffect(() => {
    setProduct(products.find(x => slugify(x.name, {replacement: '_', lower: true}) === productSlug));
  }, [/* dependencia */]);

  console.log(product);

  return (
    <>
      { Object.keys(product).length > 0 ? (
  
        <h1>{ product.name }</h1>
  
      ) : null }
    </>
  );
};