import React, { useEffect } from 'react';
// Formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
// SweetAlert
import Swal from 'sweetalert2';
// Custom Hooks
import useAuthMethods from '../../hooks/useAuthMethods';
import Required from 'components/messages/required';

export default function FormLogin(){

  const { emailAuth } = useAuthMethods();

  // Validación de formulario
  const formik = useFormik({
    // Valores iniciales de los datos a validar
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Introduce un correo valido')
    }),
    onSubmit: async (val) => {

      // console.log(val);
      const { email, password } = val;

      if(email !== '' && password !== ''){

        emailAuth(email, password);

      }else{
        Swal.fire({
          icon: 'warning',
          text: 'Ambos campos son requeridos',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
      }
    }
  })

  return (
    <form 
      className="flex flex-col justify-center w-full"
      onSubmit={ formik.handleSubmit }
    >
      <div className="mb-1">
        <p className="text-center mb-5 text-lg font-medium text-bluegray-300">Inicio de sesión</p>
        
        <label htmlFor="email" className="text-label text-left uppercase text-bluegray-300 my-1 block">Correo</label>
        <input 
          type="email"
          name="email"
          id="email"
          placeholder="mi_correo@example.com"
          className={`input-form ${formik.touched.email && formik.errors.email ? 'placeholder-red-300 bg-red-100 text-red-600 border-red-300' : 'text-gray-700'}`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      { formik.touched.email && formik.errors.email ? (
        <Required message={formik.errors.email} />
        ) : null }
      <div className="mb-1">
        <label htmlFor="password" className="text-label text-left uppercase text-bluegray-300 my-1 block">Contaseña</label>
        <input 
          type="password"
          name="password"
          id="password"
          placeholder="***********"
          className="input-form"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-p_blue-500 rounded text-white text-sm py-3 mt-4 hover:bg-p_blue-400"
      >
        Iniciar sesión
      </button>
    </form>
  );
};