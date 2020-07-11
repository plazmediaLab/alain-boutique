import React, { useContext, useEffect } from 'react';
import UserContext from '../context/user/UserContext';
import { navigate, Link } from 'gatsby';
import { Router } from '@reach/router';
import firebase from '../utils/firebase';
// Custom Hooks
import useLogOut from '../hooks/useLogOut';
// Components
import Layout from '../components/layout';
import Home from '../components/home/home';
import Sales from '../components/sales/sales';
import Sumary from '../components/sumary/sumary';
import NewProduct from '../components/new/new-product';

export default function App(){

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
          <div className="flex justify-between px-5">
            <Link to="/app">Home</Link>
            <Link to="/app/sales">Sales</Link>
            <Link to="/app/sumary">Sumary</Link>
            <Link to="/app/new">Crear Lista</Link>
          </div>
          <hr className="my-3"/>
          <Router>
            <Home path="/app"/>
            <Sales path="/app/sales"/>
            <Sumary path="/app/sumary"/>
            <NewProduct path="/app/new"/>
          </Router>
        </Layout>
      ) : null}
    </>
  );
};