import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { format, compareAsc } from 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { createPlantSchedule } from '../actions/plants'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dashboard from "./Dashboard";
import {plants} from '../reducers/plants'

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

const AddPlantWater = props => {
  const classes = useStyles();
  console.log(props.match.params.id)

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const [water, setWater] = useState({
    plant_id: props.match.params.id,

    water_schedule: JSON.stringify(selectedDate)

  })



  const handleDateChange = date => {
    setWater(date);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.createPlantSchedule(water)
    console.log(water)
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
          Add-A-Water-Schedule
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            variant="standard"
            margin="normal"
            required="true"
            fullWidth
            id="h20Frequency"
            label="h20Frequency"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            />
        </MuiPickersUtilsProvider>

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
              Save
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
  createPlantSchedule
};
export default connect(
  null,
  mapDispatchToProps
)(AddPlantWater);
