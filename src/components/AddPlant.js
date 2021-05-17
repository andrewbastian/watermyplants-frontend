import React, { useState } from "react";
//material-ui/core & icon
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {
    Select,
    InputLabel,
    /*FormHelperText,*/
    MenuItem,
    Button,
    CssBaseline,
    Box,
    Container,
    Typography,
    TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//redux and routing
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//actions
import { createPlant } from "../actions/plants";
//components
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const StyledButton = withStyles({
    root: {
        background: "#078B75",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
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
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
})(Button);

const AddPlant = (props) => {
    const classes = useStyles();
    /*console.log(props);*/

    const [plant, setPlant] = useState({
        name: "",
        location: "",
        type: "",
        water_frq: "",
    });

    const waterTimes = [
        { hrs: 24, title: "Every Day" },
        { hrs: 48, title: "Every Other Day" },
        { hrs: 72, title: "Every 3 Days" },
        { hrs: 96, title: "Every 4 Days" },
        { hrs: 120, title: "Every 5 Days" },
        { hrs: 144, title: "Every 6 Days" },
        { hrs: 168, title: "Every 7 Days" },
        { hrs: 192, title: "Every 8 Days" },
        { hrs: 216, title: "Every 9 Days" },
        { hrs: 240, title: "Every 10 Days" },
        { hrs: 264, title: "Every 11 Days" },
        { hrs: 288, title: "Every 12 Days" },
        { hrs: 312, title: "Every 13 Days" },
        { hrs: 336, title: "Every 14 Days" },
        { hrs: 720, title: "Every 30 Days" },
        { hrs: 1440, title: "Every 60 Days" },
    ];

    const handlerChange = (event) => {
        event.preventDefault();
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        props.createPlant(plant);
        console.log(plant);
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
                <form
                    className={classes.form}
                    onSubmit={submitHandler}
                    noValidate
                >
                    <TextField
                        variant="standard"
                        margin="normal"
                        required={true}
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
                        required={true}
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
                        required={true}
                        fullWidth
                        name="location"
                        value={plant.location}
                        label="Plant Location"
                        type="text"
                        id="plantLocation"
                        onChange={handlerChange}
                    />

                    <InputLabel id="label">Watering Frequency</InputLabel>
                    <Select
                        fullWidth
                        onChange={handlerChange}
                        margin="normal"
                        lablId="label"
                        id="select"
                        value="60"
                    >
                        {waterTimes.map((num) => (
                            <MenuItem value={num.hrs}>{num.title} </MenuItem>
                        ))}
                    </Select>
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
                            color="inherit"
                            className={classes.submit}
                        >
                            Add to your plants
                        </StyledButton>
                    </Box>
                </form>
            </div>
            <Box mt={18}>
                <Copyright />
            </Box>
        </Container>
    );
};

const mapDispatchToProps = {
    createPlant,
};
export default connect(null, mapDispatchToProps)(AddPlant);
