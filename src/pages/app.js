import React, { useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Router } from '@reach/router';

// Custom Hooks
import useAuthMethods from 'hooks/useAuthMethods';
import UserContext from 'context/user/UserContext';
// Components
import Layout from 'components/layout';
import Home from 'components/home/home';
import Sales from 'components/sales/sales';
import Sumary from 'components/sumary/sumary';
import NewProduct from 'components/new/new-product';
import SideBar from 'components/side-bar';
import Header from 'components/header';
import Editproduct from 'components/edit/edit-product';
import Search from 'components/search/search';
import Product from 'components/product/product';
import LoadingIcon from 'components/Resources/loading-icon';
import User from 'components/user/user';
import Parner from 'components/parner/parner';

export default function App({ location }){

  const { authState } = useAuthMethods();

  const userContext = useContext(UserContext);
  const { user, lock } = userContext;

  useEffect(() => {

    authState();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="relative">
      {user ? (
        <Layout>

          <Header location={ location.pathname } photo={ user.photo }/>

          { lock ? <div className="absolute top-0 left-0 z-50 bg-carbon-500 bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="py-5 px-10 rounded-container shadow-lg bg-white text-bluegray-300 text-sm">
              <LoadingIcon w="60" h="60" classN="mx-auto mb-3 opacity-50"/>
              <p>Procesando...</p>
            </div>
          </div> : null }

          <div className="px-3 box-content">
            <Router>
              <Home path="/app"/>
              <Sales path="/app/sales"/>
              <Sumary path="/app/sumary"/>
              <NewProduct path="/app/new"/>
              <Editproduct path="/app/edit/:productID"/>
              <Search path="/app/search"/>
              <Product path="/app/product/:productSlug"/>
              <User path="/app/user/:userID"/>
              <Parner path="/app/parner"/>
            </Router>
          </div>

          <SideBar location={ location } />

          <div className="block w-full h-20"/>

        </Layout>
      ) : null}
    </div>
  );
};