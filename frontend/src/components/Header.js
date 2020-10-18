import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IngredientForm } from "./Ingredient/IngredientForm";
import { MealForm } from "./Meal/MealForm";
import { useHeaderStyles} from "../styles/theme";


const Header = ({ user, logoutAction }) => {
  const classes = useHeaderStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <AppBar position="static" color="primary">
    <Toolbar> 
      <Typography variant="h6" className={classes.title}>
        Welcome to your meal tracker {user.name}!
      </Typography>
      <IngredientForm />  
      <MealForm />
      <Button 
        variant="contained" 
        className={classes.menuButton}
        onClick={() => logoutAction()}
      >Logout
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export {
  Header
}