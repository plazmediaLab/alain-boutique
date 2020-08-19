/**@jsx jsx */
import React, { useEffect, useState, useContext, useRef } from 'react';
import UserContext from 'context/user/UserContext';
import { Link, navigate } from 'gatsby';
import moment from 'moment';
import 'moment/locale/es';
import { jsx, css } from '@emotion/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Required from 'components/messages/required';

export default function EditProduct({ productID, location }){

  const [product, setProduct] = useState(null);
  const [mount, setMount] = useState(false);
  const [mode, setMode] = useState('');
  const [status, setStatus] = useState('');

  const inputName = useRef(null);
  const selectMode = useRef(null);
  const selectStatus = useRef(null);

  const userContext = useContext(UserContext);
  const { products, activeGroup } = userContext;

  useEffect(() => {
    if(location.state.productSent){
      setProduct(products.find(x => x.id === productID));
      setMount(true);
    }else(
      navigate('/app')
    );
  }, [/* dependencia */]);

  useEffect(() => {
    setMount(false);
    if(product){
      setMode(product.mode);
      setStatus(product.status);
    }
    if(mount){
      inputName.current.focus()
    }
  }, [mount, product]);

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      value: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().trim('El NOMBRE no puede ser de solo espacios en blanco').strict(true),
      value: Yup.number().min(0, 'El VALOR no puede ser menor de 0.'),
      price: Yup.number().min(0, 'El PRECIO no puede ser menor de 0.').moreThan(Yup.ref('value'), 'El PRECIO no puede ser menor al valor.'),
      comment: Yup.string().trim('El COMENTARIO no puede ser de solo espacios en blanco').strict(true),
    }),
    onSubmit: val => {
      
      console.log(val);
      console.log(formik.errors);

    }
  })

  return (
    <>
      { product ? (
        <article>
          <header className="mb-4 flex justify-between items-center text-title-item">
            <Link 
              to="/app"
              state={{ editCancel: true }}
              className="text-red-500 font-light flex items-center"
            >
              <svg className="arrow-circle-left w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
              Cancelar
            </Link>
            <p className="text-bluegray-200 text-description" >
              Grupo:  <span className={`bg-${activeGroup.color} text-right text-white rounded-full px-2`}>{ capitalize(activeGroup.name.replace(/(_)/g, ' ')) }</span>
            </p>
          </header>
          
          <section className="rounded-container shadow-container bg-white overflow-hidden">
            <header className="border-b-2 border-p_blue-100 p-4 border-dashed relative"
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
              onSubmit={ formik.handleSubmit }
              className="p-4"
              css={css`
                > * {
                  /* border: 1px solid red; */
                }
                > div:not(:last-child){
                  margin-bottom: .5rem;
                }
                > div:last-child{
                  margin-top: 2rem;
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
                  ref={ inputName }
                  type="text"
                  name="name"
                  id="name" 
                  className="placeholder-p_blue-300 text-title-page font-medium text-center border-b border-bluegray-100 p-2 w-full bg-transparent focus:border-p_blue-400"
                  placeholder={ product.name }
                  value={ formik.values.name }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
              </div>

              <div className="grid grid-cols-2 col-gap-8">
                <aside className="relative">
                  <svg  class="currency-dollar text-bluegray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <label htmlFor="value" className="text-label uppercase text-bluegray-300 block">Valor</label>
                  <input 
                    type="number"
                    name="value"
                    id="value"
                    className="placeholder-p_blue-300 text-carbon-500 text-title-item border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                    placeholder={ product.value }
                    value={ formik.values.value }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                  />
                </aside>
                <aside className="relative">
                  <svg  class="currency-dollar text-bluegray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <label htmlFor="price" className="text-label uppercase text-bluegray-300 block">Precio</label>
                  <input 
                    type="number"
                    name="price"
                    id="price"
                    className="placeholder-p_blue-300 text-carbon-500 text-title-item border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                    placeholder={ product.price }
                    value={ formik.values.price }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                  />
                </aside>
              </div>

              <div className="grid grid-cols-2 col-gap-8">
                <aside className="relative">
                  <svg className={`w-5 h-5 ${mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                  <label htmlFor="mode" className="text-label uppercase text-bluegray-300 block">Estado</label>
                  <select 
                    ref={ selectMode }
                    name="mode"
                    id="mode"
                    className="text-carbon-500 text-description border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                    onChange={ () => setMode(selectMode.current.value) }
                    >
                    <option 
                      value="NEW" 
                      selected={mode === 'NEW' ? true : false}
                      >
                      NUEVO
                    </option>
                    <option 
                      value="USED" 
                      selected={mode === 'USED' ? true : false}
                      >
                      USADO
                    </option>
                  </select>
                </aside>
                <aside className="relative">
                  <svg className={`w-5 h-5 ${status === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <label htmlFor="status" className="text-label uppercase text-bluegray-300 block">Modo</label>
                  <select 
                    ref={ selectStatus }
                    name="status"
                    id="status"
                    className="text-carbon-500 text-description border-b border-bluegray-100 p-2 pl-8 w-full bg-transparent appearance-none focus:border-p_blue-400"
                    onChange={ () => setStatus(selectStatus.current.value) }
                  >
                    <option 
                      value="STOCK" 
                      selected={status === 'STOCK' ? true : false}
                    >
                      STOCK
                    </option>
                    <option 
                      value="ACTIVE" 
                      selected={status === 'ACTIVE' ? true : false}
                    >
                      VENTA
                    </option>
                  </select>
                </aside>
              </div>

              <div>
                <label htmlFor="name" className="text-label uppercase text-bluegray-300 block">Comentario</label>
                <textarea 
                  name="comment"
                  id="comment"
                  cols="comment"
                  className="placeholder-p_blue-300 text-description border-b border-bluegray-100 py-2 w-full bg-transparent appearance-none focus:border-p_blue-400"
                  placeholder={ product.comment }
                  value={ formik.values.comment }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                ></textarea>
              </div>

              
              { formik.errors.name && formik.touched.name ? <Required message={ formik.errors.name } classN='text-center'/> : null }
              { formik.errors.value && formik.touched.value ? <Required message={ formik.errors.value } classN='text-center'/> : null }
              { formik.errors.price && formik.touched.price ? <Required message={ formik.errors.price } classN='text-center'/> : null }
              { formik.errors.comment && formik.touched.comment ? <Required message={ formik.errors.comment } classN='text-center'/> : null }

              <div className="text-description grid grid-cols-2 col-gap-3">
                <button 
                  type="submit"
                  className="flex items-center justify-center p-2 uppercase text-bluegray-400 hover:text-red-500"
                >
                  <svg class="trash w-5 h-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  Eliminar
                </button>
                <button 
                  type="button"
                  className="bg-p_blue-500 text-white rounded-card p-2 uppercase hover:bg-p_blue-400"
                >
                  Guardar cambios
                </button>
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