import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Required from '../messages/required';
import useDbMethods from '../../hooks/useDbMethods';
import { useContext } from 'react';
import UserContext from '../../context/user/UserContext';

export default function FormNewProduct(){

  const userContext = useContext(UserContext);
  const { activeGroup } = userContext;

  const { createProduct } = useDbMethods();

  // Validación de formulario
  const formik = useFormik({
    // Valores iniciales de los datos a validar
    initialValues: {
      name: '',
      value: '',
      price: '',
      status: '',
      mode: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El campo NOMBRE es obligatorio').trim(),
      value: Yup.number().required('El campo VALOR es obligatorio').min(0, 'El VALOR no puede ser menor a 0'),
      price: Yup.number().min(0, 'El VALOR no puede ser menor a 0').moreThan(Yup.ref('value'), 'El PRECIO no puede ser menor al VALOR'),
      status: Yup.string().required('El STADO del producto es obligatorio').trim(),
      mode: Yup.string().required('El MODO del producto es obligatorio').trim(),
    }),
    onSubmit: async (val, { resetForm }) => {
      
      if(val.price === ''){
        val.price = val.value
      }

      const data = {
        name: val.name,
        value: val.value,
        price: val.price,
        status: val.status,
        mode: val.mode,
        comment: val.comment.trim(),
        date: new Date(),
        init: false,
        group: activeGroup
      }

      try {

        createProduct(data);
        
        resetForm(formik.initialValues);
      } catch (error) {
        console.log(error.message);
      }
    }
  })

  return (
    <form
      onSubmit={ formik.handleSubmit }
      className="bg-white p-2 rounded shadow border-t-8 border-p_blue-500 mt-2"
    >
      <div>
        <label className="new-product-label text-xs text-p_blue-500 mb-1 inline-block" htmlFor="name">Producto</label>
        <input 
          className="new-product-input rounded bg-bluegray-100 appearance-none border-b border-gray-400 w-full p-3 mb-2 text-gray-700 leading-tight text-sm placeholder-bluegray-300"
          type="text"
          name="name" id="name"
          placeholder="Playera 2m"
          value={ formik.values.name }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
        />        
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="new-product-label text-xs text-p_blue-500 my-1 flex items-center" htmlFor="value">
            <svg className="w-4 h-4 text-bluegray-300 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            Valor
          </label>
          <input 
            className="new-product-input rounded bg-bluegray-100 border-b border-gray-400 w-full p-3 mb-2 text-gray-700 leading-tight text-sm placeholder-bluegray-300"
            type="number"
            name="value" id="value"
            min="0"
            placeholder="$30"
            value={ formik.values.value }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />        
        </div>
        <div>
          <label className="new-product-label text-xs text-p_blue-500 my-1 flex items-center" htmlFor="price">
            <svg className="w-4 h-4 text-bluegray-300 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            Precio
          </label>
          <input 
            className="new-product-input rounded bg-bluegray-100 border-b border-gray-400 w-full p-3 mb-2 text-gray-700 leading-tight text-sm placeholder-bluegray-300"
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
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="new-product-label text-xs text-p_blue-500 my-1 flex items-center" htmlFor="mode">
            <svg className="w-4 h-4 text-bluegray-300 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            El producto es?
          </label>
          <select 
            className="p-3 mb-2 pr-8 new-product-input rounded bg-bluegray-100 border-b border-gray-400 w-full text-gray-700 leading-tight text-sm placeholder-bluegray-300"
            name="mode" id="mode"
            value={ formik.values.mode }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          >
            <option value="" label="--- Seleccionar ---">---</option>
            <option value="USED">Usado</option>
            <option value="NEW">Nuevo</option>
          </select>
        </div>
        <div>
          <label className="new-product-label text-xs text-p_blue-500 my-1 flex items-center" htmlFor="status">
            <svg className="w-4 h-4 text-bluegray-300 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            El producto está en?
          </label>
          <select 
            className="p-3 mb-2 pr-8 new-product-input rounded bg-bluegray-100 border-b border-gray-400 w-full text-gray-700 leading-tight text-sm placeholder-bluegray-300"
            name="status" id="status"
            value={ formik.values.status }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          >
            <option value="" label="--- Seleccionar ---"></option>
            <option value="STOCK">Stock</option>
            <option value="ACTIVE">Venta</option>
          </select>
        </div>
      </div>
      <div>
        <label className="new-product-label text-xs text-p_blue-500 my-1 flex items-center" htmlFor="comment">Comentario</label>
        <textarea 
          name="comment" id="comment"
          className="p-3 mb-2 pr-8 new-product-input rounded bg-bluegray-100 border-b border-gray-400 w-full text-gray-700 leading-tight text-sm placeholder-bluegray-300"
          rows="3"
          placeholder="Playera roja con estampado de súper héroes, con detalles en las manga"
          value={ formik.values.comment }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
        />
      </div>

      <hr className="mb-2"/>

      <section className="my-4">
        { formik.errors.name && formik.touched.name ? <Required message={formik.errors.name} /> : null }
        { formik.errors.value && formik.touched.value ? <Required message={formik.errors.value} /> : null }
        { formik.errors.price && formik.touched.price ? <Required message={formik.errors.price} /> : null }
        { formik.errors.status && formik.touched.status ? <Required message={formik.errors.status} /> : null }
        { formik.errors.mode && formik.touched.mode ? <Required message={formik.errors.mode} /> : null }
      </section>

      <button 
        type="submit"
        className="w-full bg-green-500 text-white uppercase text-sm p-2 rounded cursor-pointer"
      >Agregar producto</button>
    </form>
  );
};