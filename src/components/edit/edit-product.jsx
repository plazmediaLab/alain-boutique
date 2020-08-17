import React, { useEffect, useState, useContext } from 'react';
import UserContext from 'context/user/UserContext';
import { Link, navigate } from 'gatsby';

export default function EditProduct({ productID, location }){

  const [product, setProduct] = useState(null);

  const userContext = useContext(UserContext);
  const { products } = userContext;

  useEffect(() => {
    if(location.state.productSent){
      setProduct(products.find(x => x.id === productID))
    }else(
      navigate('/app')
    )
  }, [/* dependencia */]);

  return (
    <>
      { product ? (
        <article>
          <Link to="/app" >Cancelar</Link>
          <h1>Editar producto id: { product.id }</h1>
          <p>Nombre: { product.name }</p>
        </article>
      ) : (
        null
      )}
    </>
  );
};