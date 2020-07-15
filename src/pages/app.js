import React, { useEffect, useContext } from 'react';
import { Router } from '@reach/router';
import UserContext from '../context/user/UserContext';
// Custom Hooks
import useAuthMethods from '../hooks/useAuthMethods';
// Components
import Layout from '../components/layout';
import Home from '../components/home/home';
import Sales from '../components/sales/sales';
import Sumary from '../components/sumary/sumary';
import NewProduct from '../components/new/new-product';
import SideBar from '../components/side-bar';
import Header from '../components/header';

export default function App({ location }){

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

          <Header location={ location.pathname } photo={ user.photo }/>

          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center">
              {/* <img src={user.photo ? user.photo : PerfilDefaultImage} alt="Avatar Google" className="w-10 h-10 rounded-full mr-2"/> */}
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
            <Home path="/app" title={ 'Inicio' }/>
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