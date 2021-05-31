import React, { useEffect, useState } from "react";
import { authFetch, logout } from "../../auth";
import { Button } from "../../components/Header/styles";
import { Tag, WrapperSecret } from "./styles";

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
    <WrapperSecret>
      <Tag>Secret: {message}</Tag>
      <Button logout onClick={() => logout()}>Logout</Button>
    </WrapperSecret>
  )
}

export default Secret;