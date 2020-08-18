/**@jsx jsx */
import React, { useEffect, useState, useContext } from 'react';
import UserContext from 'context/user/UserContext';
import { Link, navigate } from 'gatsby';
import moment from 'moment';
import 'moment/locale/es';
import { jsx, css } from '@emotion/core';

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
          <header className="mb-4">
            <Link 
              to="/app"
              state={{ editCancel: true }}
              className="text-red-500 text-title-item font-light flex items-center"
            >
              <svg className="arrow-circle-left w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
              Cancelar
            </Link>
          </header>
          
          <section className="rounded-container shadow-container bg-white overflow-hidden">
            <header className="border-b border-p_blue-200 p-4 border-dashed relative"
              css={css`
                div::after{
                  position: absolute;
                  content: '';
                  width: 20px;
                  height: 20px;
                  top: calc(50% - 10px);
                  right: 1rem;
                  background-color: #ECF0F3;
                  border-radius: 100%;
                  box-shadow: inset 0px 1px 3px rgba(187, 204, 242, 0.3), inset 0px 3px 12px -2px rgba(187, 204, 242, 0.8);
                }
              `}
            >
              <div className="text-description text-bluegray-200 rounded-full">
                <p><span className="font-light bg-transparent">CREADO EL:</span> { moment.utc(product.date.seconds * 1000).format('ll') }</p>
              </div>
            </header>
            <form 
              className="p-4"
              css={css`
                > * {
                  /* border: 1px solid red; */
                }
                > div:not(:last-child){
                  margin-bottom: .5rem;
                }
                > div:nth-child(1){
                  margin-bottom: 1.5rem;
                }
                input, textarea, select{
                  border-radius: 0;
                }
                aside > svg{
                  position: absolute;
                  top: calc(50% - 3px);
                  left: 0;
                }
              `}
            >
              <div className="text-center">
                <label htmlFor="name" className="text-label uppercase text-bluegray-300 block">Nombre</label>
                <input 
                  type="text"
                  name="name"
                  id="name" 
                  className="placeholder-p_blue-300 text-title-page font-medium text-center border-b border-bluegray-100 p-2 w-full bg-transparent focus:border-p_blue-400"
                  placeholder={ product.name }
                />
              </div>
              <div>
                <label htmlFor="name" className="text-label uppercase text-bluegray-300 block">Comentario</label>
                <textarea 
                  name="comment"
                  id="comment"
                  cols="comment"
                  className="placeholder-p_blue-300 text-description border-b border-bluegray-100 p-2 w-full bg-transparent appearance-none focus:border-p_blue-400"
                  placeholder={ product.comment }
                ></textarea>
              </div>
              <div className="grid grid-cols-2 col-gap-8">
                <aside className="relative">
                  <svg className={`w-5 h-5 ${product.mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                  <label htmlFor="mode" className="text-label uppercase text-bluegray-300 block">Comentario</label>
                  <select 
                    name="mode"
                    id="mode"
                    className="text-carbon-500 text-description border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                  >
                    <option 
                      value="NEW" 
                      selected={product.mode === 'NEW' ? true : false}
                    >
                      NUEVO
                    </option>
                    <option 
                      value="USED" 
                      selected={product.mode === 'USED' ? true : false}
                    >
                      USADO
                    </option>
                  </select>
                </aside>
                <aside className="relative">
                  <svg className={`w-5 h-5 ${product.status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <label htmlFor="status" className="text-label uppercase text-bluegray-300 block">Comentario</label>
                  <select 
                    name="status"
                    id="status"
                    className="text-carbon-500 text-description border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                  >
                    <option 
                      value="STOCK" 
                      selected={product.status === 'STOCK' ? true : false}
                    >
                      STOCK
                    </option>
                    <option 
                      value="ACTIVE" 
                      selected={product.status === 'ACTIVE' ? true : false}
                    >
                      VENTA
                    </option>
                  </select>
                </aside>
              </div>
            </form>
          </section>
        </article>
      ) : (
        null
      )}
    </>
  );
};