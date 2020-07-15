import React, { useEffect, useContext } from 'react';
import { Router } from '@reach/router';
import UserContext from '../context/user/UserContext';
// Images 
import PerfilDefaultImage from '../images/perfil-default-img.png';
// Components
import Layout from '../components/layout';
import Home from '../components/home/home';
import Sales from '../components/sales/sales';
import Sumary from '../components/sumary/sumary';
import NewProduct from '../components/new/new-product';
// Custom Hooks
import useAuthMethods from '../hooks/useAuthMethods';
import SideBar from '../components/home/side-bar';

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

          <Router>
            <Home path="/app"/>
            <Sales path="/app/sales"/>
            <Sumary path="/app/sumary"/>
            <NewProduct path="/app/new"/>
          </Router>
          <SideBar />
        </Layout>
      ) : null}
    </>
  );
};