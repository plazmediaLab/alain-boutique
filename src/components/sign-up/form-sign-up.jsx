import React from 'react';
import { navigate } from 'gatsby';
// Formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Error from '../messages/error';
// SweetAlert
import Swal from 'sweetalert2';
// firebase
import firebase from '../../utils/firebase';

export default function FormSignUp(){

  // Validación de formulario
  const formik = useFormik({
    // Valores iniciales de los datos a validar
    initialValues: {
      email: '',
      password: '',
      password_repeat: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Introduce un correo valido').required('El correo electrónico es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña tiene que tener al menos 6 caracteres'),
      password_repeat: Yup.string().required('La confirmación de contraseña es obligatoria').min(6, 'La contraseña tiene que tener al menos 6 caracteres')
    }),
    onSubmit: async (val) => {

      // console.log(val);
      const { email, password, password_repeat } = val;

      if(password === password_repeat){

          firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {

            Swal.fire({
              icon: 'success',
              title: 'Tu registro fue exitoso',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            })
  
            navigate('/');

          }).catch(function(error) {
            Swal.fire({
              icon: 'warning',
              text: 'La dirección de correo electrónico ya está en uso por otra cuenta.',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

          });

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
          name="password"
          placeholder="Contraseña"
          className="input-form sm:w-64"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.password && formik.errors.password ? (
          <Error 
            message={ formik.errors.password }
            sm_w='w-64'
            mb='mb-2'
          />
        ) : null }
        <input 
          type="password"
          name="password_repeat"
          placeholder="Confirma tu contraseña"
          className="input-form sm:w-64"
          value={formik.values.password_repeat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.password_repeat && formik.errors.password_repeat ? (
          <Error 
          message={ formik.errors.password_repeat }
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