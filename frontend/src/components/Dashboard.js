import React from "react";
import { Header } from './Header';
import { MealContainer } from "./Meal/MealContainer" ;

const Dashboard = ({ user, onLogoutHook }) => (
  <div>
    <Header user={user} logoutAction={onLogoutHook}/>
    <MealContainer />
  </div>
  )

export {
  Dashboard
}