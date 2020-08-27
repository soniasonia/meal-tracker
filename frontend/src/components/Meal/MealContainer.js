import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import { Meal } from "./Meal";
import { IngredientForm } from "../Ingredient/IngredientForm";
import { IngredientSelection } from "../Ingredient/IngredientSelection";
import { MealForm } from "./MealForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  setBackendAuthToken,
  getBackendAuthToken,
  deleteBackendAuthToken,
} from "../../session/localStorage";
import {Day} from "./Day";

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
      const response = await axios.get(APP_URL + "/api/meal/?date=20200825", {
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
      setIngredients(response.data)
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
      <h2>Add ingredient</h2>
      <IngredientForm></IngredientForm>
      <h2>Select ingredient</h2>
      <IngredientSelection></IngredientSelection>
      <MealForm />
      <h2>Meals</h2>
      {
        meals && meals.length > 0 ? meals.map(meal => (
          <Meal 
            key={meal.id}
            name={meal.name || "Shrimp and Chorizo Paella"}
            photoUrl={meal.photoUrl || "https://material-ui.com/static/images/cards/paella.jpg"}
            date={meal.date}
            total_kcal={meal.total_kcal || "0" }
            ingredients={meal.meal_ingredients}
          />
        )) : <h3>No meals found! Add some ;)</h3>
      }
 
      <Day meals={meals}></Day>
    </div>
  );
};

export { MealContainer };
