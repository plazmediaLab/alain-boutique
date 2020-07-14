import React, { useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import { Router } from '@reach/router';
import UserContext from '../context/user/UserContext';
// Images 
import PerfilDefaultImage from '../images/perfil-default-img.png'
// Components
import Layout from '../components/layout';
import Home from '../components/home/home';
import Sales from '../components/sales/sales';
import Sumary from '../components/sumary/sumary';
import NewProduct from '../components/new/new-product';
// Custom Hooks
import useAuthMethods from '../hooks/useAuthMethods';

export default function App(){

  const { authState, logOut } = useAuthMethods();

  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    authState();
    //eslint-disable-next-line
  }, [/* dependencia */]);

  return (
    <>
      {user ? (
        <Layout>
          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center">
              <img src={user.photoURL ? user.photoURL : PerfilDefaultImage} alt="Avatar Google" className="w-10 h-10 rounded-full mr-2"/>
              <p>{user.email}</p>
            </div>
            <button 
              className="py-2 px-4 bg-red-600 text-white text-sm rounded hover:bg-red-500 mt-3"
              onClick={logOut}
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