
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TrendingUpOutlined } from '@material-ui/icons';

const theme = createMuiTheme({
    palette: {
      default: {
        main: '#829191'
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
      padding: 10,
    },
  });


const useHeaderStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
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
    error:{
        backgroundColor: "#fff6f6",
        color: theme.palette.error.dark,
        borderColor: '#e0b4b4',
        border: "1px solid",
        borderRadius: "5px",
        fontSize: "1rem",
        position: "relative",
        marginTop: "1em",
        fontWeight: 700,
        display: "inline-block",
        padding: ".5833em .833em",
        lineHeight: 1, 
        textAlign: "center",       
      },
     
    fieldError: {
        backgroundColor: "#fff6f6",
        color: theme.palette.error.dark,
        borderColor: '#e0b4b4',
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
            backgroundColor: "#fff6f6",
            borderColor: '#e0b4b4',
            border: "1px solid",
            borderRight: 0,
            borderBottom: 0,
        }
      },     
  }));
  

export {theme, useHeaderStyles, useFormStyles};