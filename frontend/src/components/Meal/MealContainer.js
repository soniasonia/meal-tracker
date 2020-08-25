import React, { useEffect, useState } from 'react';
import axios from "axios";
import { APP_URL } from "../../config";
import { Meal } from "./Meal";
import { IngredientForm } from "../Ingredient/IngredientForm";
import { IngredientSelection } from "../Ingredient/IngredientSelection";
import { MealForm } from "./MealForm";
import { makeStyles } from '@material-ui/core/styles';
import { setBackendAuthToken, getBackendAuthToken, deleteBackendAuthToken } from "../../session/localStorage" 


const useStyles = makeStyles({
    mealContainer: {
      padding: 30,
    },
  });


  
const MealContainer = () => {
    const classes = useStyles();
    const [meals, setMeals] = useState([]);

    useEffect(() => {



        async function fetchData() {
            const response = await axios.get(APP_URL + "/api/meal/", {
                headers: {
                  Authorization: `Token ${getBackendAuthToken()}`,
                },
              });
            setMeals(response.data);
          }

        fetchData();
      }, [])

    return (
        <div className={classes.mealContainer}>
          <h2>Add ingredient</h2>
          <IngredientForm></IngredientForm>
          <h2>Select ingredient</h2>
          <IngredientSelection></IngredientSelection>
          <h2>Meals</h2>
          {meals ? (
          <table><thead><th>ID</th><th>Date</th><th>Calories</th><th>Ingredients</th></thead>
            {meals.map(meal => (
            <tr><td>{meal.id}</td><td> {meal.date} </td><td> {meal.total_kcal} </td>          
                <td><ul>
              {meal.meal_ingredients.map(ingredient => (
              <li>{ingredient.ingredient} {ingredient.weight}</li>
                ))}
          </ul></td></tr>
          )
          )}         
          </table>): "No meals..."}
            <MealForm />
            <div>
                <Meal />
                <Meal />
                <Meal />
            </div>
        </div>
    );
}

export {
    MealContainer
}