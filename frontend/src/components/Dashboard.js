import React from "react";
import { Header } from './Header';
import { MealContainer } from "./Meal/MealContainer" ;

const Dashboard = ({ user, logoutAction }) => (
  <div>
    <Header user={user} logoutAction={logoutAction}/>
    <MealContainer />
  </div>
  )

export {
  Dashboard
}