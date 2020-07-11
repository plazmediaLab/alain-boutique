import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import UserContext from '../context/user/UserContext';
import { navigate } from 'gatsby';
import firebase from '../utils/firebase';
// Custom Hooks
import useLogOut from '../hooks/useLogOut';

export default function Home(){

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  const [ LogOut ] = useLogOut();

  useEffect(() => {
    if(!localStorage.getItem('token-user')){
      navigate('/');
    }else{
      firebase.auth().onAuthStateChanged(res => {
        getUser(res); 
      })
    }
    //eslint-disable-next-line
  }, [/* dependencia */]);

  return (
    <>
      {user ? (
        <Layout>
          <h1>Home page</h1>
          <hr className="my-3"/>
          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center">
              <img src={user.photoURL} alt="Avatar Google" className="w-10 h-10 rounded-full mr-2"/>
              <p>{user.email}</p>
            </div>
            <button 
              className="py-2 px-4 bg-red-600 text-white text-sm rounded hover:bg-red-500 mt-3"
              onClick={LogOut}
            >
              Log Out
            </button>
          </div>
        </Layout>
      ) : null}
    </>
  );
};