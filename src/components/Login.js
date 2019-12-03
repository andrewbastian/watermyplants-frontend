import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import {authenticateUser} from '../actions/auth'

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

const Login = props => {
  const classes = useStyles();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handlerChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const submitHandler = event => {
    event.preventDefault();
    props.authenticateUser(user)
    console.log(user)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required ="true"
            fullWidth
            name="username"
            value={props.username}
            label="Username"
            type="text"
            id="username"
            autoComplete="current-password"
            onChange={handlerChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required="true"
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={props.password}
            id="password"
            autoComplete="current-password"
            onChange={handlerChange}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="inherited"
            className={classes.submit}
          >
            Sign in
          </StyledButton>
          <Grid container>
            <Grid item xs>
              <Link to="/Register">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  authenticateUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
