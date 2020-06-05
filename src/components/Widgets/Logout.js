import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles';
const useStyles= makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: "auto",
  },
}));
function Logout(props) {
  const classes=useStyles();
  return (
      <div style={{marginTop:"2vh",fontSize:"2vh"}} >
        <Link to="/login/"><Button type="submit"
            id="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{marginTop:"2vh"}} >{props.text}</Button></Link>
      </div>
  );
}
export default Logout;