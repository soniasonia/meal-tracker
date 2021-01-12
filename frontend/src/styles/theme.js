
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      gray: {
        light: '#F5F5F5',
        main: '#E0E0E0',
        dark: '#757575',
      },    
      primary: {
        main: '#9BC53D',
      },
      secondary: {
        main: '#FFA400',
      },
      error: {
        main: '#EE6352',
      },
      warning: {
        main: '#EE6352',
      },
      info: {
        main: '#253C78',
      },
      success: {
        main: '#568259',
      },
    },
  });


const useHeaderStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      '&:hover':{
        backgroundColor: theme.palette.secondary.dark,
      } 

    },
    title: {
      flexGrow: 1,
    },
  }));

const useDayStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    minWidth: 295,
    minHeight: 190,
    display: "inline-block",
    margin: 10,
    backgroundColor: theme.palette.gray.main,
  },
  table: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  detailRow:
  {
    backgroundColor: theme.palette.gray.light,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  totalCalories: {
    lineHeight: 2,
    fontWeight: "bold",
    textAlign: "right",
  },
  date: {
    color: theme.palette.primary.dark,
  }
}));

const useAppStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url("peas.jpg")`,
    backgroundSize: "cover",
    position: "fixed",
    top: "0",
    left: "0",
    minWidth: "100%",
    minHeight: "100%",
  },
  loginAndSignup: {
    width: "675px",
    position: "relative",
    margin: "0 auto",
    paddingTop: "15%",
  },
  mealContainer: {
    padding: 30,
  },  
  daySelection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
  }
}));

const useFormStyles = makeStyles((theme) => ({
    button: {
      maxWidth: 345,
      display: "inline-block",
      margin: 10,
    },
    formRoot: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    lastError:{
        backgroundColor: "#FFF6F6",
        color: theme.palette.error.dark,
        borderColor: '#E0B4B4',
        border: "1px solid",
        borderRadius: "5px",
        fontSize: "0.85rem",
        position: "relative",
        marginTop: "1em",        
        marginBottom: "2em",
        marginLeft: "2.2em",        
        marginRight: "1em",
        fontWeight: 700,
        display: "inline-block",
        padding: ".5833em .833em",
        lineHeight: 2, 
        width: "80%",
        textAlign: "center",
      },
     
    fieldError: {
        backgroundColor: "#FFF6F6",
        color: theme.palette.error.dark,
        borderColor: '#E0B4B4',
        border: "1px solid",
        borderRadius: "5px",
        fontSize: "0.85rem",
        position: "relative",
        marginTop: "1em",
        fontWeight: 700,
        display: "inline-block",
        padding: ".5833em .833em",
        lineHeight: 1,  
        '&::before': {
            transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
            position: "absolute",
            top: 0,
            left: "50%",
            content: "''",
            width: ".6666em",
            height: ".6666em",
            marginTop: "-1px",
            backgroundColor: "#FFF6F6",
            borderColor: '#E0B4B4',
            border: "1px solid",
            borderRight: 0,
            borderBottom: 0,
        }
      },     
  }));
  

export {theme, useHeaderStyles, useFormStyles, useDayStyles, useAppStyles};