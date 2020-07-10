import React, { useEffect } from "react"
import Layout from "../components/layout"
// Custom Hooks
import useAuthUser from '../hooks/useAuthUser';
import useStatusAuth from '../hooks/useStatusAuth';

export default function Home() {

  const [ status, Login ] = useAuthUser();
  const [ statusAuth ] = useStatusAuth();

  useEffect(() => {
    statusAuth();
  }, [/* dependencia */]);

  return(
    <>
      {localStorage.getItem('token-user') ? null :
      (
        <Layout>
          <h1 className="text-2xl text-gray-900 mb-3">Index Page</h1>
          <button
            className="py-2 px-4 bg-p_blue-500 text-white text-sm rounded hover:bg-p_blue-400 mt-3"
            onClick={Login}
          >
            
            Login with Google
          </button>
        </Layout>
      )}
      { status ? <h1>Loading...</h1> : null }
    </>
  )
}