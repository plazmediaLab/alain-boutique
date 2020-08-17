import { useContext, useState } from 'react';
import UserContext from '../context/user/UserContext';
import { useNavigate } from '@reach/router';
// Firebase
import { auth, googleProvider, facebookProvier } from '../utils/firebase';
// SweetAlert
import Swal from 'sweetalert2';
import useDbMethods from './useDbMethods';

export default function useAuthMethods(){

  const push = useNavigate();

  const [loading, setLoading] = useState(false);
  
  const userContext = useContext(UserContext);
  const {
    emailAuthMethod,
    googleAuthMethod,
    facebookAuthMethod,
    logOutMethod,
    authStateMethod,
  } = userContext;

  const { init, getProducts, getGroups } = useDbMethods();
  
  // Registro de usuario
  const signUp = (email, pass) => {
    auth.createUserWithEmailAndPassword(email, pass).then(res => {

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
    auth.signInWithEmailAndPassword(email, pass).then((res) => {

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
    
    setLoading(true);
    
    auth.signInWithPopup(googleProvider).then(res => {
      
      // Set token in LocalStorage
      localStorage.setItem("token-user", res.user.refreshToken);
      
      const data = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        photo: res.user.photoURL,
        token: res.user.refreshToken,
      }
      
      googleAuthMethod(data);
      
      init(res.user.uid);
      
      setLoading(false);
      
      push('/app');
      
    }).catch(err => {
      setLoading(false);
      console.log(err);
    })
  };
  // Autenticación con Facebook
  const facebookAuth = () => {

    setLoading(true);
    
    auth.signInWithPopup(facebookProvier).then(res => {
      
      // Set token in LocalStorage
      localStorage.setItem("token-user", res.user.refreshToken);
      
      const data = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        photo: res.user.photoURL,
        token: res.user.refreshToken,
      }
      
      facebookAuthMethod(data);
      
      init(res.user.uid);
      
      setLoading(false);
      
      push('/app');
      
    }).catch(error => {
      setLoading(false);
      console.log(error);
    })
  };
  // Cerrar sesión
  const logOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("token-user");
      logOutMethod()
      push('/');
    });
  };
  // Estado de usuario auteticado
  const authState = async () => {
    await auth.onAuthStateChanged( user => {

      setLoading(true);

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
  
        authStateMethod(data);

        getProducts(user.uid);

        getGroups(user.uid);

        setLoading(false);
        
        push('/app');
        
      }else{
        localStorage.removeItem('token-user');
        setLoading(false);
        push('/');
      }
    });
  };

  return {
    loading,
    signUp,
    emailAuth,
    googleAuth,
    facebookAuth,
    logOut,
    authState
  };
};