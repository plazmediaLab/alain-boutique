/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import FetchingIcon from 'components/Resources/fetching-icon';
import { useFormik } from 'formik';
import { useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import UserContext from '../../context/user/UserContext';
import useDbMethods from '../../hooks/useDbMethods';
import Required from '../messages/required';

export default function FormNewProduct(){

  const [mode, setMode] = useState('USED');
  const [statusItem, setStatusItem] = useState('STOCK');
  
  const modeRef= useRef(null);
  const statusRef= useRef(null);

  const userContext = useContext(UserContext);
  const { activeGroup } = userContext;

  const { fetching, createProduct } = useDbMethods();

  const handleMode = () => {
    setMode(modeRef.current.value);
  };
  const handleStatus = () => {
    setStatusItem(statusRef.current.value);
  };

  // Validación de formulario
  const formik = useFormik({
    // Valores iniciales de los datos a validar
    initialValues: {
      comment: '',
      mode: '',
      name: '',
      price: '',
      status: '',
      value: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El campo NOMBRE es obligatorio').trim('El NOMBRE no puede ser de solo espacios en blanco'),
      comment: Yup.string().required('El campo NOMBRE es obligatorio').trim('El COMENTARIO no puede ser de solo espacios en blanco'),
      value: Yup.number().min(0, 'El VALOR no puede ser menor a 0').lessThan(Yup.ref('price'), 'El VALOR no puede ser mayor al PRECIO'),
      price: Yup.number().required('El campo PRECIO es obligatorio').min(0, 'El VALOR no puede ser menor a 0'),
    }),
    onSubmit: async (val, { resetForm }) => {

      if(val.value === ''){
        val.value = 0
      }

      const data = {
        comment: val.comment.trim(),
        color: activeGroup.color,
        date: new Date(),
        group: activeGroup.name,
        init: false,
        mode: mode,
        name: val.name,
        price: val.price,
        sold: false,
        soldDate: null,
        status: statusItem,
        value: val.value,
      }

      try {

        createProduct(data);
        
        resetForm(formik.initialValues);
        setMode('USED');
        setStatusItem('STOCK');

      } catch (error) {
        console.log(error.message);
      }
    }
  })

  return (
    <form
      onSubmit={ formik.handleSubmit }
      className={`bg-white p-3 rounded shadow-container border-t-8 border-${activeGroup.color} mt-2 relative overflow-hidden`}
    >
      <div className="mb-2">
        <label className="label-form-new" htmlFor="name">Producto</label>
        <input
          className="input-form-new placeholder-p_blue-300"
          type="text"
          name="name" id="name"
          placeholder="Playera 2m"
          value={ formik.values.name }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
        />        
      </div>
      <div className="grid grid-cols-2 gap-2 row-gap-0 mb-2">
        <label className="label-form-new" htmlFor="value">
          <svg className="w-4 h-4 text-bluegray-200 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          Valor
        </label>
        <label className="label-form-new" htmlFor="price">
          <svg className="w-4 h-4 text-bluegray-200 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          Precio
        </label>
        <div 
          className="p-1 border border-bluegray-200 bg-transparent rounded col-span-2 grid grid-cols-2 col-gap-2"
        >
          <input 
            className={`${formik.errors.value && formik.touched.value ? 'bg-red-200 placeholder-red-500' : 'placeholder-p_blue-300' } p-2 text-carbon-500 text-description placeholder-p_blue-300`}
            type="number"
            name="value" id="value"
            min="0"
            placeholder="$30"
            value={ formik.values.value }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />        
          <input 
            className={`${formik.errors.price && formik.touched.price ? 'bg-red-200 placeholder-red-500' : 'bg-p_blue-100 placeholder-p_blue-400' }  p-2 px-3 text-carbon-500 text-description `}
            type="number"
            name="price" id="price"
            min="0"
            placeholder="$50"
            value={ formik.values.price }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />        
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <label className="label-form-new" htmlFor="mode">
            <svg className="w-4 h-4 text-bluegray-200 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span>Estado</span>
          </label>
          <div className="p-1 pr-2 border border-bluegray-200 bg-transparent rounded flex items-center">
            <svg className={`w-5 h-5 mx-1 ${mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            <select 
              ref={ modeRef }
              className="placeholder-p_blue-300 overflow-hidden truncate p-2 w-full text-description bg-transparent"
              name="mode" id="mode"
              value={ mode }
              onChange={ handleMode }
            >
              <option value="USED">USADO</option>
              <option value="NEW">NUEVO</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label-form-new" htmlFor="status">
            <svg className="w-4 h-4 text-bluegray-200 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span>Modo</span>
          </label>
          <div className="p-1 pr-2 border border-bluegray-200 bg-transparent rounded flex items-center">
            <svg className={`w-6 h-6 ml-1 ${statusItem === 'ACTIVE' ? 'text-yellow-500' : 'text-bluegray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <select 
              ref={ statusRef }
              className="placeholder-p_blue-300 overflow-hidden truncate p-2 w-full text-description bg-transparent"
              name="status" id="status"
              value={ statusItem }
              onChange={ handleStatus }
            >
              <option value="STOCK">STOCK</option>
              <option value="ACTIVE">VENTA</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="label-form-new" htmlFor="comment">Comentario</label>
        <textarea 
          name="comment" id="comment"
          className="input-form-new placeholder-p_blue-300 mb-2"
          rows="3"
          placeholder="Playera roja con estampado de súper héroes, con detalles en las manga"
          value={ formik.values.comment }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
        />
      </div>

      <section className="mb-6">
        { formik.errors.name && formik.touched.name ? <Required message={formik.errors.name} /> : null }
        { formik.errors.value && formik.touched.value ? <Required message={formik.errors.value} /> : null }
        { formik.errors.price && formik.touched.price ? <Required message={formik.errors.price} /> : null }
      </section>

      <button 
        type="submit"
        className="w-full bg-p_blue-500 text-white uppercase text-description font-medium p-3 rounded cursor-pointer flex items-center justify-center"
      >
        {fetching ? (
          <FetchingIcon classN='mr-2' width='12' height='12' />
        ) : null}
        Agregar producto
      </button>

      <hr
        className="absolute" 
        css={css`
          bottom: 4.2rem;
          left: 0;
          width: 100%;
          border: none;
          background: transparent;
          border-bottom: 1px dashed #BBCCF2;
        `}
      />
    </form>
  );
};