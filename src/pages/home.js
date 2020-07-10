import React, { useEffect, useContext } from 'react';
import firebase from '../auth/firebase'
import { navigate } from 'gatsby';
import UserContext from '../context/user/UserContext'
import Layout from '../components/layout';

export default function Home(){
  // TODO · Redireccionar en caso de no estar autenticado 07/08/2020 

  const userContext = useContext(UserContext);
  const { user, logOut } = userContext;

  useEffect(() => {
    if(!user) navigate('/')
  }, [user]);

  // Cerrar sesión
  const Logout = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('token-user');
      logOut()
    })
  };

  return (
    <>
      {user ? (
        <Layout>
          <h1>Home page</h1>
          <hr/>
          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center">
              <img src={user.photoURL} alt="Avatar Google" className="w-10 h-10 rounded-full mr-2"/>
              <p>{user.email}</p>
            </div>
            <button 
              className="py-2 px-4 bg-red-600 text-white text-sm rounded hover:bg-red-500 mt-3"
              onClick={Logout}
            >
              Log Out
            </button>
          </div>
        </Layout>
      ) : null}
    </>
  );
};