import React,{useState} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'
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
  const [done,setDone]=useState(false);
  const classes=useStyles();
  if(done)
  {
    return(
    <Redirect to={{pathname:"/login/"}}/>
    )
  }
  else{
  return (
      <div style={{marginTop:"2vh",fontSize:"2vh"}} >
        <Button type="submit"
            id="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{marginTop:"2vh"}} onClick={() => {
              setDone(true);
            }} >{props.text}</Button>
      </div>
  );
  }
}
export default Logout;