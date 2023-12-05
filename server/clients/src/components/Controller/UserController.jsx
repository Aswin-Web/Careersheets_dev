import React from 'react'
import UseAuth from '../../hooks/auth'

const UserController = (props) => {
    const {role,verification,name} = UseAuth()
  if ((role=== 'user' || role==='superuser') && verification=== true ){
    return props.children
  }
  return  ;
}

export default UserController