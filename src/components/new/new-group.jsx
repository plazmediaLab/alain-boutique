/**@jsx jsx */
import React, { useContext, useRef, useEffect, useState } from 'react';
import UserContext from '../../context/user/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Required from '../messages/required';
import useDbMethods from '../../hooks/useDbMethods';
import slugify  from 'slugify';
import { jsx, css } from '@emotion/core';

export default function NewGroup(){

  const [color, setColor] = useState('bluegray-200');

  const input = useRef(null);
  const colorRef = useRef(null);

  const userContext = useContext(UserContext);
  const { closeModal } = userContext;

  const { createGroup } = useDbMethods();

  useEffect(() => {
    input.current.focus();
  }, [/* dependencia */]);

  const colors = [
    {
      name: 'rojo',
      value:'red-500'
    },
    {
      name: 'anaranjado',
      value: 'orange-500'
    },
    {
      name: 'verde',
      value:'green-500'
    },
    {
      name: 'yellow',
      value:'yellow-500'
    },
    {
      name: 'té',
      value: 'teal-500'
    },
    {
      name: 'azul',
      value: 'blue-500'
    },
    {
      name: 'indigo',
      value: 'indigo-500'
    },
    {
      name: 'morado',
      value: 'purple-500'
    },
    {
      name: 'rosa',
      value: 'pink-500'
    },
  ];
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const formik = useFormik({
    initialValues: {
      nameGroup: '',
    },
    validationSchema: Yup.object({
      nameGroup: Yup.string().required('El nombre del grupo no puede estar vacío').trim()
    }),
    onSubmit: val => {

      const data = {
        name: slugify(val.nameGroup, {
          replacement: '_',  // replace spaces with replacement character, defaults to `-`
          lower: true,      // convert to lower case, defaults to `false`
        }),
        color: color,
        date: new Date()
      }

      createGroup(data);

      closeModal();
    }
  })

  return (
    <form
      className="w-full relative"
      onSubmit={ formik.handleSubmit }
    >
      <button
        className="absolute"
      ></button>
      <label htmlFor="nameGroup" className="text-xl font-light text-p_blue-500 text-center inline-block w-full pb-2 mb-2">
        Nombre del grupo
      </label>
      <input
        ref={ input }
        id="nameGroup"
        name="nameGroup" 
        type="text"
        placeholder="Ej: Ropa de mi bebé"
        className="input-form-new appearance-none focus:outline-none focus:shadow-outline"
        value={ formik.values.nameGroup }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />

      <div className="py-3 text-center">
        <p className="text-title-item text-bluegray-300 mb-2">Selecciona un color para etiquetar al grupo</p>
        <div className="bg-transparent rounded border border-bluegray-200 w-full text-carbon-500 leading-tight text-description relative flex items-center"
          css={css`
            svg.chevron-down{
              position: absolute;
              top: calc(50% - .75rem);
              right: .5rem;
              z-index: -2;
            }
            select{
              z-index: 5;
            }
          `}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-down w-6 h-6 text-carbon-200"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          <span className={`bg-${ color } inline-block w-4 h-4 ml-3 rounded-full`}></span>
          <select 
            ref={ colorRef }
            name="color" id="color"
            className="appearance-none bg-transparent w-full flex-1 p-3"
            onChange={ () => setColor(colorRef.current.value) }
          >
            <option value="bluegray-200" label="--- Sin color ---"></option>
            { colors.map( (color, index) => (
              <option value={ color.value } key={index} className="p-10">{ capitalize(color.name) }</option>
            )) }
          </select>
        </div>
      </div>
 
      <button 
        type="submit"
        className={`w-full ${formik.errors.nameGroup && formik.touched.nameGroup ? 'mb-4' : ''} p-2 bg-p_blue-500 rounded text-white mt-2 flex items-center justify-center`}
      >
        <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg>
        Agregar grupo
      </button>

      { formik.errors.nameGroup && formik.touched.nameGroup ? <Required message={ formik.errors.nameGroup } /> : null }

    </form>
  );
};