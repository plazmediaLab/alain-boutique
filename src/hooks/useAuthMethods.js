import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { useNavigate } from '@reach/router';
// Firebase
import firebase from '../utils/firebase';
// SweetAlert
import Swal from 'sweetalert2';

export default function useAuthMethods(){
  const push = useNavigate()

  const userContext = useContext(UserContext);
  const { 
    emailAuthMethod,
    googleAuthMethod,
    logOutMethod,
    authStateMethod
   } = userContext;


  // Registro de usuario
  const signUp = (email, pass) => {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(res => {

      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Tu registro fue exitoso',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      push('/');

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
      
      emailAuthMethod(data)
      push('/app');
      
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
  // Autenticación con Google
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

      googleAuthMethod(data)
      push('/app');

    }).catch(err => {
      console.log(err);
    })
  };
  const logOut = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("token-user");
      logOutMethod()
      push('/');
    });
  };
  const authState = () => {
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
  
        authStateMethod(data)
  
        push('/app');
  
      }else{
        localStorage.removeItem('token-user');
        push('/');
      }
    });
  };

  return {
    signUp,
    emailAuth,
    googleAuth,
    logOut,
    authState
  };
};