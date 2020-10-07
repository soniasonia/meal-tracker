import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import { IngredientForm } from "../Ingredient/IngredientForm";
import { MealForm } from "./MealForm";
import { makeStyles } from "@material-ui/core/styles";
import { getBackendAuthToken } from "../../session/localStorage";
import { Day } from "./Day";

const useStyles = makeStyles({
  mealContainer: {
    padding: 30,
  },
});

const MealContainer = () => {
  const classes = useStyles();
  const [daysOffset, setDaysOffset] = React.useState([0,1,2,3,4,5,6]);

  return (
    <div className={classes.mealContainer}>
      <IngredientForm /> <br></br>
      <MealForm />
      <h2>Meals</h2>
      {
        daysOffset.map(day => (
          <Day key={day} day={day}></Day>
        ))
      }
    </div>
  );
};

export { MealContainer };
