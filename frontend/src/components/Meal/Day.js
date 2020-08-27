import React from 'react';
import PropTypes from 'prop-types';
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


const Day = ({ meals }) => {

    function IngredientDetails(item) {
        const key = item.ingredient.id;
        const name = item.ingredient.name;
        const weight = item.weight;
        const kcal_per_100g = item.ingredient.kcal_per_100g;
        const kcal = item.kcal;
        return (
          <TableRow key={key}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{kcal_per_100g}</TableCell>
            <TableCell align="right">{weight}</TableCell>
            <TableCell align="right">{kcal}</TableCell>
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
              <TableCell align="right">{total_kcal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Ingredient</TableCell>
                          <TableCell align="right">Calories per 100g</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Total calories</TableCell>
                        </TableRow>
                      </TableHead>
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



    return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Meal</TableCell>
                <TableCell align="right">Calories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meals.map((row) => (
                <Row key={row.id} 
                name={row.name || "Shrimp and Chorizo Paella"}
                total_kcal={row.total_kcal || "0" }
                ingredients={row.meal_ingredients || []}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

};
export { Day };
