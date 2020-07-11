import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import firebase from '../utils/firebase';
import { navigate } from 'gatsby';

export default function useStatusAuth(){

  // Context
  const userContext = useContext(UserContext);
  const { getUser } = userContext;

  const stateAuth = () => {
    if(localStorage.getItem('token-user')){
      firebase.auth().onAuthStateChanged(res => {
        getUser(res); 
        navigate('/app');
      }) 
    }
  };
  
  return [ stateAuth ];
};