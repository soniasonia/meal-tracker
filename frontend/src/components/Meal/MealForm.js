import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ColorizeIcon from "@material-ui/icons/Colorize";

import axios from "axios";
import { APP_URL } from "../../config";
import { IngredientRow } from "./IngredientRow";
import { getBackendAuthToken } from "../../session/localStorage";
import {useHeaderStyles, useFormStyles} from "../../styles/theme";

const MealForm = () => {
  const [formOpened, setFormOpened] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(false);

  const maxIngredients = 2;
  const headerClasses = useHeaderStyles();
  const formClasses = useFormStyles();

  const pushNewIngredient = (index, ingredient) => {
    if (
      ingredients[index] &&
      ingredients[index].id === ingredient.id &&
      ingredients[index].weight === ingredient.weight
    ) {
      return;
    }
    ingredients[index] = ingredient;
    setIngredients(ingredients);
  };

  const handleFormOpen = () => {
    setFormOpened(true);
  };

  const handleFormClose = () => {
    setFormOpened(false);
  };

  const handleFormSubmit = () => {
    async function createMeal() {
      const ingredientList = ingredients.map((i) => ({
        ingredient: i.id,
        weight: i.weight,
      }));
      try {
        const response = await axios.post(
          APP_URL + "/api/meal/",
          { meal_ingredients: ingredientList },
          {
            headers: {
              Authorization: `Token ${getBackendAuthToken()}`,
            },
          }
        );
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.status === 400
        ) {
          setError(error.response.data);
          return;
        }
        setError({ non_field_errors: error.toString() });
        return;
      }
      setError(false);
      handleFormClose();
    }
    createMeal();
  };

  return (
    <React.Fragment>
      <Button 
        variant="contained" 
        className={headerClasses.menuButton}
        onClick={handleFormOpen}>
        Add new meal
      </Button>
      <Dialog maxWidth="md" open={formOpened} onClose={handleFormClose}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add new meal for Today
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={formClasses.formRoot} noValidate autoComplete="off">
              {/* TODO: Loop over maxIngredients and yield IngredientRow, use value as index */}
              <IngredientRow
                addIngredientToForm={pushNewIngredient}
                index={0}
              ></IngredientRow>
              <IngredientRow
                addIngredientToForm={pushNewIngredient}
                index={1}
              ></IngredientRow>
              <div>
                <Tooltip title="New Ingredient">
                  <IconButton aria-label="new-ingredient">
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Pick Existing Ingredient">
                  <IconButton aria-label="existing-ingredient">
                    <ColorizeIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </form>
            <br></br>
            {error && error.non_field_errors ? (
              <div className={formClasses.error}>
                {error.non_field_errors}
              </div>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
};

export { MealForm };
