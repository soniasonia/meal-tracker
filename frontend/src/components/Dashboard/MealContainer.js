import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { Day } from "./Day";
import { TRACKED_DAYS_THRESHOLD } from "../../config"
import { useAppStyles }  from "../../styles/theme";

const generateRange = from => Array.from(Array(from).keys());

const MealContainer = () => {
  const classes = useAppStyles();
  const [daysThreshold, setDaysThreshold] =  React.useState(TRACKED_DAYS_THRESHOLD);
  const [daysOffset, setDaysOffset] = React.useState(generateRange(TRACKED_DAYS_THRESHOLD));

  useEffect(() => {
    setDaysOffset(Array.from(Array(daysThreshold).keys()));
  }, [daysThreshold]); 

  const handleChange = (numb) => {
    setDaysThreshold(numb)
    setDaysOffset(generateRange(numb));
  }

  return (
    <div className={classes.mealContainer}>
      <div className={classes.daySelection}>Showing the last  
          <ButtonGroup size="large" >
              <Button 
                color="primary"
                variant={daysThreshold === 7 ? "contained" : ""}          
                onClick={daysThreshold === 7 ? null : () => handleChange(7)}>7</Button>
              <Button 
                color="primary"
                variant={daysThreshold === 14 ? "contained" : ""}
                onClick={daysThreshold === 14 ? null : () => handleChange(14)}>14</Button>
              <Button 
                color="primary"
                variant={daysThreshold === 30 ? "contained" : ""}
                onClick={daysThreshold === 30 ? null : () => handleChange(30)}>30</Button>
            </ButtonGroup>
        days 
      </div> 
      {
        daysOffset.map(day => (
          <Day key={day} day={day}></Day>
        ))
      }
    </div>
  );
};

export { MealContainer };
