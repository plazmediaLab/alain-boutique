import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import firebase from '../auth/firebase'

export default function Home() {

  // State Local
  const [user, setuser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        // Inicío sesión
        setuser(user)
        console.log(user);
      }else{
        // Aún no inicia sesión o cerro sesión
        setuser(null);
      };
    })
  }, [/* dependencia */]);

  // Iniciar sesión
  const Login = () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(res => {
      let token = res.credential.accessToken;
    }).catch(err => {
      console.log(err);
    })
  };

  // Cerrar sesión
  const Logout = () => {
    firebase.auth().signOut().then(() => {
      setuser(null);
    })
  };

  return(
    <Layout>
      {user ? (
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
      ) : (
          <>
            <button
              className="py-2 px-4 bg-p_blue-500 text-white text-sm rounded hover:bg-p_blue-400 mt-3"
              onClick={Login}
            >
              
              Login with Google
            </button>
          </>
      )}
    </Layout>
  )
}