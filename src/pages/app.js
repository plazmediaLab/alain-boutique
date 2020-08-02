import React, { useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Router, Link } from '@reach/router';
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
import Editproduct from '../components/edit/edit-product';

export default function App({ location }){

  const { authState } = useAuthMethods();

  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {

    authState();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {user ? (
        <Layout>

          <Header location={ location.pathname } photo={ user.photo }/>

          {/* <Link to={`/app/edit/${ uid }`}>Editar producto</Link> */}

          <div className="px-3 box-content">
            <Router>
              <Home path="/app"/>
              <Sales path="/app/sales"/>
              <Sumary path="/app/sumary"/>
              <NewProduct path="/app/new"/>
              <Editproduct path="/app/edit/:productID"/>
            </Router>
          </div>

          <SideBar />

          <div className="block w-full h-20"/>

        </Layout>
      ) : null}
    </>
  );
};