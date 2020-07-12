import { useContext } from 'react';
import firebase from '../utils/firebase'
import { navigate } from 'gatsby';
import UserContext from '../context/user/UserContext';

export default function useLogOut(){
  
  const userContext = useContext(UserContext);
  const { logOut } = userContext;

  // Cerrar sesión
  const LogOut = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('token-user');
      logOut();
      navigate('/');
    })
  };
  
  return [ LogOut ];
};