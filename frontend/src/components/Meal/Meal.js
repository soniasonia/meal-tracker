import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "inline-block",
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Meal = ({ date, photoUrl, ingredients = [], name, total_kcal }) => {
  const classes = useStyles();

  function IngredientDetails(item) {
    const key = item.ingredient.id;
    const name = item.ingredient.name;
    const weight = item.weight;
    const kcal = item.kcal;
    return (
      <TableRow key={key}>
        <TableCell>{name}</TableCell>
        <TableCell align="right">{weight}</TableCell>
        <TableCell align="right">{kcal}</TableCell>
      </TableRow>
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={name} subheader={date} />
      <CardMedia
        className={classes.media}
        image={
          photoUrl || "https://material-ui.com/static/images/cards/paella.jpg"
        }
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Table size="small" aria-label="purchases">
            <TableBody>{ingredients.map(IngredientDetails)}
            </TableBody>
          </Table>

          <Typography variant="h6" align="right">{total_kcal} total
              </Typography>


        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Duplicate">
          <IconButton aria-label="duplicate">
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export { Meal };
