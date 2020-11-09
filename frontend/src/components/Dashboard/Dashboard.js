import React from "react";
import { Header } from "../Header/Header";
import { MealContainer } from "./MealContainer" ;

const Dashboard = ({ user, onLogoutHook }) => {

  const [handler, setHandler] =  React.useState(0);
  
  const refreshDashboard = () => {
    setHandler(handler + 1);
  };

  return (<div>
    <Header user={user} 
      logoutAction={onLogoutHook} 
      handler={refreshDashboard}/>
    <MealContainer />
  </div>)
}

export {
  Dashboard
}