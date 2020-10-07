import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { APP_URL } from "../../config";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
    getBackendAuthToken,
  } from "../../session/localStorage";
import { 
    getCardTitleAsDate, 
    getCardSubtitleAsCalories, 
    getMealNameAsTime } from "./helpers";

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


const useStyles = makeStyles((theme) => ({
root: {
    maxWidth: 345,
    minWidth: 280,
    minHeight: 190,
    display: "inline-block",
    margin: 10,
},
media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
},
}));

const humanizeByDayOffset = offset =>
  DateTime.local()
    .minus({ days: offset })
    .endOf("day")
    .toLocaleString(DateTime.DATE_HUGE);

const Day = ({ day }) => {

    const [meals, setMeals] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function fetchMeals() {
          const response = await axios.get(APP_URL + "/api/meal/?dayOffset=" + day, {
            headers: {
              Authorization: `Token ${getBackendAuthToken()}`,
            },
          });
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
            <TableCell>{name}<br></br>({kcal_per_100g} kcal)</TableCell>
            <TableCell align="right">{weight} g</TableCell>
            <TableCell align="right">{kcal} kcal</TableCell>
          </TableRow>
        );
      }

    function Row({name, total_kcal, ingredients}) {

        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
          <React.Fragment>
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">{name}</TableCell>
              <TableCell align="right"><b>{total_kcal}</b> kcal</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        {ingredients.map(IngredientDetails)}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }



    function MealTable ()
    {
        return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {meals.map((row) => (
                <Row key={row.id} 
                name={row.name || getMealNameAsTime(row.date)}
                total_kcal={row.total_kcal || "0" }
                ingredients={row.meal_ingredients || []}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
              }

    return (
        <Card className={classes.root}>
            <CardHeader 
            title={getCardSubtitleAsCalories(meals)} 
            subheader={(humanizeByDayOffset(day))}/>
            <CardContent>
                <MealTable></MealTable>
            </CardContent>
        </Card>
    )

};
export { Day };
