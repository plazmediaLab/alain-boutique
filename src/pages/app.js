import React, { useEffect, useContext } from 'react';
import { Router, Link } from '@reach/router';
import UserContext from '../context/user/UserContext';
// Custom Hooks
import useAuthMethods from '../hooks/useAuthMethods';
import useDbMethods from '../hooks/useDbMethods';
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

  const uid = 'NV2BByha5jWLIe38zdR1wmCMW4z1'

  const { authState, logOut } = useAuthMethods();
  const { getProducts } = useDbMethods();

  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {

    authState();
    if(user){
      getProducts(user.uid);
    }
    //eslint-disable-next-line
  }, []);

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
          <Link to={`/app/edit/${ uid }`}>Editar producto</Link>

          <Router>
            <Home path="/app"/>
            <Sales path="/app/sales"/>
            <Sumary path="/app/sumary"/>
            <NewProduct path="/app/new"/>
            <Editproduct path="/app/edit/:productID"/>
          </Router>

          <SideBar />
        </Layout>
      ) : null}
    </>
  );
};