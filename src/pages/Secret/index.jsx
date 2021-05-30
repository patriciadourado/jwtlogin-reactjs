import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../auth";
import { Button } from "../../components/Header/styles";
import { Tag } from "./styles";

function Secret() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    authFetch("/api/protected").then(response => {
      if (response.status === 401){
        setMessage("Sorry you aren't authorized!")
        return null
      }
      return response.json()
    }).then(response => {
      if (response && response.message){
        setMessage(response.message)
      }
    })
  }, [])
  return (
    <>
      <Tag>Secret: {message}</Tag>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </>
  )
}

export default Secret;