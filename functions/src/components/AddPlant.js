import React, { useState } from "react";
//material-ui/core & icon
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Select,
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
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
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
    selectEmpty: {
        marginTop: theme.spacing(2),
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

    const [plant, setPlant] = useState({
        name: "",
        light: "",
        type: "",
        water_frq: "",
        notes: "",
        next_watering: new Date(),
        last_watering: new Date()
    });

    const waterTimes = [
        { hrs: 1, title: "Every Day" },
        { hrs: 2, title: "Every Other Day" },
        { hrs: 3, title: "Every 3 Days" },
        { hrs: 4, title: "Every 4 Days" },
        { hrs: 5, title: "Every 5 Days" },
        { hrs: 5, title: "Every 6 Days" },
        { hrs: 7, title: "Every 7 Days" },
        { hrs: 8, title: "Every 8 Days" },
        { hrs: 9, title: "Every 9 Days" },
        { hrs: 10, title: "Every 10 Days" },
        { hrs: 11, title: "Every 11 Days" },
        { hrs: 12, title: "Every 12 Days" },
        { hrs: 13, title: "Every 13 Days" },
        { hrs: 14, title: "Every 14 Days" },
        { hrs: 30, title: "Every 30 Days" },
        { hrs: 60, title: "Every 60 Days" },
    ];

    const light = ["\u2600 Full Sun", "\u26C5 Partial Sun", "\u2601 Shade"];

    const handlerChange = (event) => {
        event.preventDefault();
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        plant.next_watering.setDate(plant.last_watering.getDate() + plant.water_frq)
        props.createPlant(plant);

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
                        label="Common Name"
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
                        label="Scientific Name"
                        type="text"
                        id="plantType"
                        onChange={handlerChange}
                    />

                    <Select
                        className={classes.selectEmpty}
                        displayEmpty
                        fullWidth
                        required={true}
                        onChange={handlerChange}
                        lablId="light-label"
                        id="label"
                        name="light"
                        value={plant.light}
                    >
                        <MenuItem value="" disabled>
                            {" "}
                            Light Conditions *
                        </MenuItem>
                        {light.map((light) => (
                            <MenuItem name="light" value={light}>
                                {light}{" "}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        className={classes.selectEmpty}
                        displayEmpty
                        fullWidth
                        onChange={handlerChange}
                        lablId="label-label"
                        id="label"
                        name="water_frq"
                        value={plant.water_frq}
                    >
                        <MenuItem value="" disabled>
                            {" "}
                            Watering Frequency
                        </MenuItem>
                        {waterTimes.map((num) => (
                            <MenuItem name="hrs" value={num.hrs}>
                                {num.title}{" "}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        className={classes.selectEmpty}
                        onChange={handlerChange}
                        value={plant.notes}
                        fullWidth
                        name="notes"
                        id="outlined-multiline-notes"
                        label="Notes:"
                        multiline
                        rows={4}
                        placeholder="Add a note"
                        variant="outlined"
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
