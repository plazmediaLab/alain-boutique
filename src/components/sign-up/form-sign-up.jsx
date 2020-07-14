import React from 'react';
// Formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Error from '../messages/error';
// SweetAlert
import Swal from 'sweetalert2';
// Custom Hooks
import useAuthMethods from '../../hooks/useAuthMethods';

export default function FormSignUp(){

  const { signUp } = useAuthMethods();

  // Validación de formulario
  const formik = useFormik({
    // Valores iniciales de los datos a validar
    initialValues: {
      email: '',
      pass1: '',
      pass2: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Introduce un correo valido').required('El correo electrónico es obligatorio'),
      pass1: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña tiene que tener al menos 6 caracteres'),
      pass2: Yup.string().required('La confirmación de contraseña es obligatoria').min(6, 'La contraseña tiene que tener al menos 6 caracteres')
    }),
    onSubmit: async (val) => {

      // console.log(val);
      const { email, pass1, pass2 } = val;

      if(pass1 === pass2){

        signUp( email, pass1 );

      }else{
        Swal.fire({
          icon: 'error',
          text: 'Las contraseñas no coinciden, verifica que las hayas escrito correctamente.',
          showConfirmButton: false,
          timer: 4000,
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
    <>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={formik.handleSubmit}
      >
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
          name="pass1"
          placeholder="Contraseña"
          className="input-form sm:w-64"
          value={formik.values.pass1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.pass1 && formik.errors.pass1 ? (
          <Error 
            message={ formik.errors.pass1 }
            sm_w='w-64'
            mb='mb-2'
          />
        ) : null }
        <input 
          type="password"
          name="pass2"
          placeholder="Confirma tu contraseña"
          className="input-form sm:w-64"
          value={formik.values.pass2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.pass2 && formik.errors.pass2 ? (
          <Error 
          message={ formik.errors.pass2 }
          sm_w='w-64'
          mb='mb-2'
        />
        ) : null }
        
        <button
          type="submit"
          className="w-full bg-p_blue-500 rounded text-white text-sm py-3 mt-4 sm:w-64 hover:bg-p_blue-400"
        >
          Enviar
        </button>
      </form>
    </>
  );
};