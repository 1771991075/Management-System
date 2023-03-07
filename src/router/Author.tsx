import { Navigate } from "react-router-dom";

export default function Author(props:any) {
  let token = localStorage.getItem('USER_LOGIN')
  if(token){
    return (
        <div>
            {props.oldComponent}
        </div>
    )
  }
  return <Navigate to={`/login?redircturl=${props.redircturl}`}></Navigate>
}
