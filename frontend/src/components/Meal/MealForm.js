import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ColorizeIcon from '@material-ui/icons/Colorize';

import axios from "axios";
import { APP_URL } from "../../config";
import { IngredientRow } from "./IngredientRow";
import { setBackendAuthToken, getBackendAuthToken, deleteBackendAuthToken } from "../../session/localStorage" 


const useStyles = makeStyles((theme) => ({
  button: {
    maxWidth: 345,
    display: "inline-block",
    margin: 10,
  },
  formRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

async function createMeal() {
  const response = await axios.post(APP_URL + "/api/meal/", 
  {'meal_ingredients': [
    {'ingredient': '1',
     'weight': 100},
    {'ingredient': '1',
     'weight': 200}]
  },
  {
    headers: {
      Authorization: `Token ${getBackendAuthToken()}`,
    },
  });
}

const MealForm = () => {
  const classes = useStyles();
  const [formOpened, setFormOpened] = React.useState(false);
  const [ingredients, setIngredients] = React.useState(false);

  const handleFormOpen = () => {
    setFormOpened(true);
  };

  const handleFormClose = () => {
    setFormOpened(false);
  };

  const handleFormSubmit = () => {
    alert("in progress!");
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleFormOpen}>
        Add new meal!
      </Button>

      <Dialog
        maxWidth="md"
        open={formOpened}
        onClose={handleFormClose}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add new meal for Today!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={classes.formRoot} noValidate autoComplete="off">

            <IngredientRow></IngredientRow>
            <IngredientRow></IngredientRow>
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
    </div>
  );
}

export {
  MealForm
}