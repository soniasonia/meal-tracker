import React from 'react';
import { Meal } from "./Meal";
import { MealForm } from "./MealForm";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    mealContainer: {
      padding: 30,
    },
  });

const MealContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.mealContainer}>
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