import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        display: "inline-block",
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const Meal = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Shrimp and Chorizo Paella"
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image="https://material-ui.com/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <ul>{props.ingredients.map(({name, weight}) => (
                        <li>{name} {weight}</li>
                    ))}</ul>
                    -- <br />
                    Total: 230 kcal <br />
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
}

export {
    Meal
}