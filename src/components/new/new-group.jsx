import React, { useContext, useRef, useEffect } from 'react';
import UserContext from '../../context/user/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Required from '../messages/required';
import useDbMethods from '../../hooks/useDbMethods';
import slugify  from 'slugify';

export default function NewGroup(){

  const input = useRef(null);

  const userContext = useContext(UserContext);
  const { closeModal } = userContext;

  const { createGroup } = useDbMethods();

  useEffect(() => {
    input.current.focus();
  }, [/* dependencia */]);

  const formik = useFormik({
    initialValues: {
      nameGroup: ''
    },
    validationSchema: Yup.object({
      nameGroup: Yup.string().required('El campo no puede estar vacío').trim()
    }),
    onSubmit: val => {

      const data = {
        name: slugify(val.nameGroup, {
          replacement: '_',  // replace spaces with replacement character, defaults to `-`
          lower: true,      // convert to lower case, defaults to `false`
        }),
        date: new Date()
      }

      createGroup(data);

      closeModal();
    }
  })

  return (
    <form
      className="w-full"
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
        className="input-form"
        value={ formik.values.nameGroup }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
 
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