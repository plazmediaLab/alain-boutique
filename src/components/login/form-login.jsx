import React from 'react';
// Formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Error from '../messages/error';
// SweetAlert
import Swal from 'sweetalert2';
// Custom Hooks
import useAuthMethods from '../../hooks/useAuthMethods';

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
      className="flex flex-col justify-center items-center mb-4 w-full"
      onSubmit={ formik.handleSubmit }
    >
      <p className="text-carbon-200 mb-4 text-xs">——— O ———</p>
      <input 
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="input-form sm:w-64"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      { formik.touched.email && formik.errors.email ? (
        <Error 
          message={ formik.errors.email }
          sm_w='w-64'
          mb='mb-2'
        />
      ) : null }
      <input 
        type="password"
        name="password"
        placeholder="Contraseña"
        className="input-form sm:w-64"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <button
        type="submit"
        className="w-full bg-p_blue-500 rounded text-white text-sm py-3 mt-4 sm:w-64 hover:bg-p_blue-400"
      >
        Iniciar sesión
      </button>
    </form>
  );
};