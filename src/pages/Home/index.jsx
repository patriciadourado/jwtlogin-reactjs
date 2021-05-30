import React, { useEffect } from "react";
import Header from "../../components/Header";

function Home() {
  useEffect(() => {
    fetch("/api").then(resp => resp.json()).then(resp => console.log(resp))
  }, [])
  
  return(
    <>
      <Header />
    </>
  );

}

export default Home;