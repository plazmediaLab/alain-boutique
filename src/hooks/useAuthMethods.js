import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { useNavigate } from '@reach/router';
// Firebase
import { auth, db, googleProvider, facebookProvier } from '../utils/firebase';
// SweetAlert
import Swal from 'sweetalert2';

export default function useAuthMethods(){
  const push = useNavigate()

  const userContext = useContext(UserContext);
  const { 
    emailAuthMethod,
    googleAuthMethod,
    facebookAuthMethod,
    logOutMethod,
    authStateMethod,
    getProductsState
   } = userContext;

  const getProducts = collectionName => {
    let products = [];
    db.collection(collectionName).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(`${doc.id} => ${doc.data()}`);
        if(products.length === 0){
          
        }
        products = [
          ...products,
          {
            id: doc.id,
            name: doc.data().name,
            value: doc.data().value,
            price: doc.data().price,
            comment: doc.data().comment,
            date: doc.data().date,
            status: doc.data().status,
          }
        ];
      })
      getProductsState(products);
      products = [];
    })
  };

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

      getProducts(data.uid)

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

      googleAuthMethod(data)

      getProducts(data.uid)

      push('/app');

    }).catch(err => {
      console.log(err);
    })
  };
  // Autenticación con Facebook
  const facebookAuth = () => {
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

      facebookAuthMethod(data)

      getProducts(data.uid)

      push('/app');

    }).catch(error => {
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
  const authState = () => {
    auth.onAuthStateChanged( user => {

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

        getProducts(data.uid)
  
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
    facebookAuth,
    logOut,
    authState
  };
};