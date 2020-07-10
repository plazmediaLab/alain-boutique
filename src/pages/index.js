import React, { useContext, useEffect } from "react"
import Layout from "../components/layout"
import firebase from '../auth/firebase'
import { navigate } from 'gatsby';
import UserContext from '../context/user/UserContext';

export default function Home() {

  // Context
  const userContext = useContext(UserContext);
  const { getUser, user } = userContext;

  useEffect(() => {
    if(localStorage.getItem('token-user')){
      firebase.auth().onAuthStateChanged(res => {
        getUser(res); 
        navigate('/home');
      })
    }
  }, [/* dependencia */]);

  // Iniciar sesión
  const Login = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(res => {
      let token = res.credential.accessToken;
      localStorage.setItem("token-user", token);
      getUser(res.user);
      navigate('/home');
    }).catch(err => {
      console.log(err);
    })
  };

  return(
    <Layout>
      <h1 className="text-2xl text-gray-900 mb-3">Index Page</h1>
      <button
        className="py-2 px-4 bg-p_blue-500 text-white text-sm rounded hover:bg-p_blue-400 mt-3"
        onClick={Login}
      >
        
        Login with Google
      </button>
    </Layout>
  )
}