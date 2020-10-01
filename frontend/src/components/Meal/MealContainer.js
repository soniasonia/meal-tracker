import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import { IngredientForm } from "../Ingredient/IngredientForm";
import { MealForm } from "./MealForm";
import { makeStyles } from "@material-ui/core/styles";
import { getBackendAuthToken } from "../../session/localStorage";
import { Day } from "./Day";
import { getDaysArray } from "./helpers";

const useStyles = makeStyles({
  mealContainer: {
    padding: 30,
  },
});

const MealContainer = () => {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // TODO: Missing try catch block.
    // TODO: Missing check for response code.
    async function fetchMeals() {
      const response = await axios.get(APP_URL + "/api/meal/?date=20200902", {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
      setMeals(response.data);
    }
    async function fetchIngredients() {
      const response = await axios.get(APP_URL + "/api/ingredient/", {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
      setIngredients(response.data);
    }
    fetchMeals();
    fetchIngredients();
  }, []);

  // function getListOfIngredientsPerMeal(meal_ingredients)
  // {
  //   var dict = {};
  //   meal_ingredients.map((ingredient) => (
  //     dict[]
  //   ))
  // }

  return (
    <div className={classes.mealContainer}>
      <IngredientForm/> <br></br><MealForm />
      <h2>Meals</h2>
      {


      getDaysArray(7).map((day) => (
        <Day day={day}></Day>
      ))}
      
    </div>
  );
};

export { MealContainer };
