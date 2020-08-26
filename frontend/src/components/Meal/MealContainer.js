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
    async function fetchMeals() {
      const response = await axios.get(APP_URL + "/api/meal/", {
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
      var dict = {};
      var ingredients = response.data;
      ingredients.map((i) => {
        dict[i.id] = i;
      });
      setIngredients(dict);
      console.log(dict);
      console.log(dict[1]);
      console.log(dict[1].name)
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
      <h2>Meals</h2>
      {meals ? (
      <div>
        <table>
          <thead>
            <th>ID</th>
            <th>Date</th>
            <th>Calories</th>
            <th>Ingredients</th>
          </thead>
          {meals.map((meal) => (
            <tr>
              <td>{meal.id}</td>
              <td> {meal.date} </td>
              <td> {meal.total_kcal} </td>
              <td>
                <ul>
                  {meal.meal_ingredients.map((ingredient) => (
                    <li>
                      {ingredients[ingredient.ingredient].name} {ingredient.weight}g
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </table>
        </div>) : (
        "No meals..."
      )}
      <MealForm />
    </div>
  );
};

export { MealContainer };
