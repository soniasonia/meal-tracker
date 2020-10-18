import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import { APP_URL } from "../../config";
import { getBackendAuthToken } from "../../session/localStorage";
import {useHeaderStyles, useFormStyles} from "../../styles/theme";


const IngredientForm = () => {
  const [name, setName] = React.useState("");
  const [kcalPer100, setKcalPer100] = React.useState("");
  const [formOpened, setFormOpened] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  const headerClasses = useHeaderStyles();
  const formClasses = useFormStyles();

  const handleFormOpen = () => {
    setFormOpened(true);
  };

  const handleFormClose = () => {
    setFormOpened(false);
  };

  useEffect(() => {
    setError(false);
  }, [formOpened]); // Remove error message when closing form

  const onFormSubmit = (event) => {
    event.preventDefault();
    async function createIngredient() {
      try {
        const response = await axios.post(
          APP_URL + "/api/ingredient/",
          {
            name: name,
            kcal_per_100g: kcalPer100,
          },
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
    createIngredient();
  };

  return (
    <React.Fragment>
      <Button 
        variant="contained" 
        className={headerClasses.menuButton}
        onClick={handleFormOpen}>
        Add new ingredient
      </Button>

      <Dialog maxWidth="md" open={formOpened} onClose={handleFormClose}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add new ingredient
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={formClasses.formRoot}>
              <TextField id="standard-basic" 
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}>
              </TextField>
              <br></br>{" "}
              {error && error.name ? (
                <div className={formClasses.fieldError}>
                  {error.name}
                </div>
              ) : null}
              <br></br>
              <TextField 
                id="standard-basic" 
                label="Calories per 100g"
                type="text"
                value={kcalPer100}
                onChange={(e) => setKcalPer100(e.target.value)}>
              </TextField>
              <br></br>
              {error && error.kcal_per_100g ? (
                <div className={formClasses.fieldError}>
                  {error.kcal_per_100g}
                </div>
              ) : null}
            </form>
            <br></br>
            {error && error.non_field_errors ? (
              <center><div className={formClasses.error}>
                {error.non_field_errors}            
              </div></center>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={(event) => onFormSubmit(event)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export { IngredientForm };
