import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
// Firebase
import firebase from '../../utils/firebase';
// SweetAlert
import Swal from 'sweetalert2';
import { navigate } from 'gatsby';

import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  LOG_OUT,
  AUTH_STATE
} from '../types';

const UserState = ({ children }) => {

  // State de pedidos
  const initialState = {
    user: null
  };

  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  // Registro de usuario
  const signOut = (email, pass) => {
  
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'Tu registro fue exitoso',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })

      navigate('/');

    }).catch(() => {
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
    
  };
  // Autenticación por correo electrónico
  const emailAuth = (email, pass) => {

    firebase.auth().signInWithEmailAndPassword(email, pass).then((res) => {

      // Set token in LocalStorage
      localStorage.setItem("token-user", res.user.refreshToken);
      
      const data = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        photo: res.user.photoURL,
        token: res.user.refreshToken,
      }
      
      dispatch({
        type: EMAIL_AUTH,
        payload: data
      })

      navigate('/app');

    }).catch(() => {
      Swal.fire({
        icon: 'error',
        text: 'El correo o la contraseña son incorrectos, revisar que esten bien escritos.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    })
  };
  const googleAuth = () => {

    
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      
      // Set token in LocalStorage
      localStorage.setItem("token-user", res.user.refreshToken);

      const data = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        photo: res.user.photoURL,
        token: res.user.refreshToken,
      }

      dispatch({
        type: GOOGLE_AUTH,
        payload: data
      })

      navigate('/app');

    }).catch(err => {
      console.log(err);
    })
  };
  const logOut = () => {

    firebase.auth().signOut().then(() => {

      localStorage.removeItem("token-user");

      dispatch({
        type: LOG_OUT
      });

      navigate('/');

    });

  }
  const authState = () =>{
    firebase.auth().onAuthStateChanged( user => {

      if(user) {
        
        // Set token in LocalStorage
        localStorage.setItem("token-user", user.refreshToken);
  
        const data = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
          token: user.refreshToken,
        }
  
        dispatch({
          type: AUTH_STATE,
          payload: data
        })
  
        navigate('/app');
  
      }else{
        localStorage.removeItem('token-user');
        navigate('/');
      }
    });
  }


  return (
    <UserContext.Provider
      value={{
        user: state.user,
        signOut,
        emailAuth,
        googleAuth,
        logOut,
        authState
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;