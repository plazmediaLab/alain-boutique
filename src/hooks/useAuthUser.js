import { useState, useContext } from 'react';
import UserContext from '../context/user/UserContext';
import firebase from '../utils/firebase';
import { navigate } from 'gatsby';

export default function useAuthUser(){
  
  const [authState, setAuthState] = useState(false);

  // Context
  const userContext = useContext(UserContext);
  const { getUser } = userContext;

  // Iniciar sesión
  const Login = () => {
    setAuthState(true);
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(res => {
      // Set Token in Local Storage
      let token = res.credential.accessToken;
      localStorage.setItem("token-user", token);
      // Set data on Global State
      getUser(res.user);
      // Go to
      navigate('/home');
      setAuthState(false);
    }).catch(err => {
      console.log(err);
    })
  };
  
  return [ authState, Login ];
};