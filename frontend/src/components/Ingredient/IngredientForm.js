import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import { APP_URL } from "../../config";
import { getBackendAuthToken} from "../../session/localStorage" 

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



const IngredientForm = () => {
    const [name, setName] = React.useState("");
    const [kcalPer100, setKcalPer100] = React.useState("");
    const classes = useStyles();
    const [formOpened, setFormOpened] = React.useState(false);

    const handleFormOpen = () => {
      setFormOpened(true);
    };
    
    const handleFormClose = () => {
      setFormOpened(false);
    };

  const onFormSubmit = (event) => {
    event.preventDefault();
    async function createIngredient() {
        const response = await axios.post(APP_URL + "/api/ingredient/", 
      {
        'name': name,
        'kcal_per_100g': kcalPer100,
      }, {
        headers: {
            Authorization: `Token ${getBackendAuthToken()}`,
        },
    });
  }
  createIngredient()}

    return (
      <div>
      <Button variant="outlined" color="primary" onClick={handleFormOpen}>
        Add new ingredient!
      </Button>

      <Dialog
        maxWidth="md"
        open={formOpened}
        onClose={handleFormClose}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add new ingredient !
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
        <form 
        className={classes.formRoot}>
          <TextField id="standard-basic" label="Name">
              <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
          </TextField>
          <TextField id="standard-basic" label="Calories per 100g">
              
              <input 
                  type="text" 
                  value={kcalPer100}
                  onChange={e => setKcalPer100(e.target.value)}
              />
          </TextField>
          <button type="submit" className="ui button">Add new ingredient</button>                    
      </form><br></br>
      </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(event) => onFormSubmit(event)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }

export {IngredientForm}
