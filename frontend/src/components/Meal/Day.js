import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { APP_URL } from "../../config";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { getBackendAuthToken } from "../../session/localStorage";
import { useDayStyles } from "../../styles/theme";

function getCardSubtitleAsCalories(meals) {
  var total = 0;
  var i;
  for (i = 0; i < meals.length; i++) {
    total = total + meals[i].total_kcal;
  }
  return total + " kcal";
}

function getMealNameAsTime(mealDatetimeStr) {
  var hour = Number(mealDatetimeStr.substr(11, 2));
  var hourStr = mealDatetimeStr.substr(11, 5);
  if (hour < 10) {
    return "Breakfast at " + hourStr;
  }
  if (hour < 14) {
    return "Lunch at " + hourStr;
  }
  if (hour < 17) {
    return "Dinner at " + hourStr;
  }
  if (hour < 21) {
    return "Supper at " + hourStr;
  }
  return "Night snack :( at " + hourStr;
}

const humanizeByDayOffset = (offset) =>
  DateTime.local()
    .minus({ days: offset })
    .endOf("day")
    .toLocaleString(DateTime.DATE_HUGE);

const Day = ({ day }) => {
  const [meals, setMeals] = useState([]);
  const classes = useDayStyles();

  useEffect(() => {
    async function fetchMeals() {
      const response = await axios.get(
        APP_URL + "/api/meal/?dayOffset=" + day,
        {
          headers: {
            Authorization: `Token ${getBackendAuthToken()}`,
          },
        }
      );
      setMeals(response.data);
    }
    fetchMeals();
  }, []);

  function IngredientDetails(item) {
    const key = item.ingredient.id;
    const name = item.ingredient.name;
    const weight = item.weight;
    const kcal_per_100g = item.ingredient.kcal_per_100g;
    const kcal = item.kcal;
    return (
      <TableRow key={key}>
        <TableCell>
          {name}
          <br></br>({kcal_per_100g} kcal)
        </TableCell>
        <TableCell align="right">{weight} g</TableCell>
        <TableCell align="right">{kcal} kcal</TableCell>
      </TableRow>
    );
  }

  function Row({ name, total_kcal, ingredients }) {
    const [open, setOpen] = React.useState(false);
    const classes = useDayStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.table}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              color="secondary"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right">
            <b>{total_kcal}</b> kcal
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}
        className={classes.detailRow}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableBody>{ingredients.map(IngredientDetails)}</TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  function MealTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {meals.map((row) => (
              <Row
                key={row.id}
                name={row.name || getMealNameAsTime(row.date)}
                total_kcal={row.total_kcal || "0"}
                ingredients={row.meal_ingredients || []}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={getCardSubtitleAsCalories(meals)}
        subheader={humanizeByDayOffset(day)}
      />
      <CardContent>
        <MealTable></MealTable>
      </CardContent>
    </Card>
  );
};
export { Day };
