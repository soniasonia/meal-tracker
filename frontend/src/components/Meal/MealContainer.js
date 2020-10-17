import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Day } from "./Day";

const useStyles = makeStyles({
  mealContainer: {
    padding: 30,
  },
});

const MealContainer = () => {
  const classes = useStyles();
  const [daysOffset, setDaysOffset] = React.useState([0,1,2,3,4,5,6]);

  return (
    <div className={classes.mealContainer}>
      <h2>Meals</h2>
      {
        daysOffset.map(day => (
          <Day key={day} day={day}></Day>
        ))
      }
    </div>
  );
};

export { MealContainer };
