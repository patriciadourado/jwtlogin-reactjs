import React, { useEffect } from "react";
import Header from "../../components/Header";
const API_URL = process.env.REACT_APP_API_URL;

function Home() {
  useEffect(() => {
    fetch(API_URL+'/api').then(resp => resp.json()).then(resp => console.log(resp))
  }, [])
  
  return(
    <>
      <Header />
    </>
  );

}

export default Home;