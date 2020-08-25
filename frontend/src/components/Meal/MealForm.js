import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ColorizeIcon from '@material-ui/icons/Colorize';

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

const MealForm = () => {
  const classes = useStyles();
  const [formOpened, setFormOpened] = React.useState(false);

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
              <div>
              <TextField
                  label="Ingredient"
                  defaultValue="Apple"
                />
                <TextField
                  label="Weight (in grams)"
                  defaultValue="100"
                />
                 <TextField
                  label="Kcal (in 100 grams)"
                  defaultValue="43"
                />
              </div>
              <div>
              <TextField
                  label="Ingredient"
                  defaultValue="Apple"
                />
                <TextField
                  error
                  label="Weight (in grams)"
                  defaultValue="dupa"
                  helperText="Incorrect entry, must be a number!"
                  />
                 <TextField
                  label="Kcal (in 100 grams)"
                  defaultValue="43"
                />
              </div>
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