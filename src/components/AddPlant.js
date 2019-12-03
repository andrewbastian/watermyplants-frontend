import React, { useState } from 'react';
//material-ui/core & icon
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//material-ui/picker
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers'
//redux and routing
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
//actions
import { createPlant } from '../actions/plants'
//components
import Copyright from './Copyright'


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const StyledButton = withStyles({
  root: {
    background: "#078B75",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
})(Button);

const StyledFab = withStyles({
  root: {
    background: "#078B75",
    borderRadius: 30,
    border: 0,
    color: "white",
    height: 60,
    width: 56,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
})(Button);

const AddPlant = props => {
  const classes = useStyles();
  console.log(props)


  const [plant, setPlant] = useState({
    name: "",
    location: "",
    type: "",
  });



  const handlerChange = event => {
    event.preventDefault();
    setPlant({ ...plant, [event.target.name]: event.target.value });
  };
  const submitHandler = event => {
    event.preventDefault();
    props.createPlant(plant)
    console.log(plant)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Link to="/dashboard">
        <Box
          text="Back to Dashboard"
          color="white"
          p={2}
          position="absolute"
          top={15}
          left="10%"
          zIndex="tooltip"
        >
          <StyledFab>
            <ArrowBackIcon />
          </StyledFab>
        </Box>
      </Link>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add-A-Plant
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <TextField
            variant="standard"
            margin="normal"
            required="true"
            fullWidth
            name="name"
            value={plant.name}
            label="Plant Name"
            type="text"
            id="plantName"
            onChange={handlerChange}
          />

          <TextField
            variant="standard"
            margin="normal"
            required="true"
            fullWidth
            name="type"
            value={plant.type}
            label="Plant Type"
            type="text"
            id="plantName"
            onChange={handlerChange}
          />

          <TextField
            variant="standard"
            margin="normal"
            required="true"
            fullWidth
            name="location"
            value={plant.location}
            label="Plant Location"
            type="text"
            id="plantLocation"
            onChange={handlerChange}
          />



          <Box
            text="Back to Dashboard"
            color="white"
            p={2}
            position="center"
            top={250}
            left="100%"
            zIndex="tooltip"
          >

            <StyledButton
              type="submit"
              variant="contained"
              color="inherited"
              className={classes.submit}
            >
              Schedule water time
          </StyledButton>
          </Box>
        </form>
      </div>
      <Box mt={18}>
        <Copyright />
      </Box>
    </Container>
  );
}




const mapDispatchToProps = {
  createPlant
};
export default connect(
  null,
  mapDispatchToProps
)(AddPlant);
