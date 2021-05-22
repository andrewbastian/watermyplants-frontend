import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { getPlant, updatePlant } from "../actions/plants";

import { makeStyles } from "@material-ui/core/styles";
import {
    Select,
    MenuItem,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Divider,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EditIcon from "@material-ui/icons/Edit";

import DeleteMyPlant from "./DeletePlant";

import { countdown } from "../helpers/countdown";

/*-------------------------------------------------- */
const useStyles = makeStyles({
    modalCard: {
        maxWidth: 455,
    },
    cardTypog: {
        marginBottom: 5,
    },
});

/*-------------------------------------------------- */
function PlantModal(props) {
    const classes = useStyles();

    /*-------------------------------------------------- */
    const selectPlant = (state) =>
        state.plants.plantList.find((plant) => {
            return plant.id === props.modalID;
        });
    const modalPlant = useSelector(selectPlant);

    /*-------------------------------------------------- */
    let timeLeft = countdown(modalPlant.next_watering);

    /*-------------------------------------------------- */

    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handlerChange = (e) => {
        e.preventDefault();
        setPlant({ ...plant, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        plant.next_watering.setDate(
            PlantModal.last_watering.getDate() + plant.water_frq
        );
        props.updatePlant(plant);
    };
    /*-------------------------------------------------- */
    const [plant, setPlant] = useState({
        id: modalPlant.id,
        name: "",
        light: "",
        type: "",
        water_frq: "",
        notes: "",
        next_watering: new Date(),
        last_watering: new Date(),
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

    /*-------------------------------------------------- */
    return (
        <div>
            <Card className={classes.modalCard}>
                <CardMedia
                    component="img"
                    alt="Plant"
                    image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557258847-chinese-evergreen-houseplant-1557258690.jpg?crop=0.883xw:0.887xh;0.0849xw,0.0821xh&resize=480:*"
                    title="Plant"
                />

                <CardContent>
                    {/*______COM_NAME_______*/}
                    {isEditing ? (
                        <form onSubmit={submitHandler} noValidate>
                            <TextField
                                variant="standard"
                                onChange={handlerChange}
                                margin="normal"
                                name="name"
                                value={plant.name}
                                label="Common Name"
                                placeholder={modalPlant.name}
                                type="text"
                                id="plantName"
                            />
                        </form>
                    ) : (
                        <Typography gutterBottom variant="h5" component="h2">
                            {modalPlant.name}
                        </Typography>
                    )}

                    {/*_______SCI_NAME______*/}

                    {isEditing ? (
                        <form onSubmit={submitHandler} noValidate>
                            <TextField
                                onChange={handlerChange}
                                variant="standard"
                                margin="normal"
                                name="type"
                                value={plant.type}
                                label="Scientific Name"
                                placeholder={modalPlant.type}
                                type="text"
                                id="plantType"
                            />
                        </form>
                    ) : (
                        <Typography
                            gutterBottom
                            variant="overline"
                            component="h2"
                        >
                            {modalPlant.type}
                        </Typography>
                    )}

                    {/*________LIGHT________*/}

                    {isEditing ? (
                        <form onSubmit={submitHandler} noValidate>
                            <Select
                                className={classes.selectEmpty}
                                displayEmpty
                                fullWidth
                                onChange={handlerChange}
                                labelId="light-label"
                                id="label"
                                name="light"
                                value={plant.light}
                            >
                                <MenuItem value="" disabled>
                                    {" "}
                                    Light Conditions *
                                </MenuItem>
                                {light.map((light, index) => (
                                    <MenuItem key="index" name="light" value={light}>
                                        {light}{" "}
                                    </MenuItem>
                                ))}
                            </Select>
                        </form>
                    ) : (
                        <Typography
                            className={classes.cardTypog}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {modalPlant.light}
                        </Typography>
                    )}

                    {/*_____________________*/}
                    {isEditing ? (
                        <form onSubmit={submitHandler} noValidate>
                            <Select
                                className={classes.selectEmpty}
                                displayEmpty
                                fullWidth
                                onChange={handlerChange}
                                labelId="label-label"
                                id="label"
                                name="water_frq"
                                value={plant.water_frq}
                            >
                                <MenuItem value="" disabled>
                                    {" "}
                                    Watering Frenquency
                                </MenuItem>
                                {waterTimes.map((num, index) => (
                                    <MenuItem name="hrs" key="index" value={num.hrs}>
                                        {num.title}{" "}
                                    </MenuItem>
                                ))}
                            </Select>
                        </form>
                    ) : (
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.cardTypog}
                        >
                            <AccessTimeIcon color="primary" fontSize="small" />{" "}
                            Water in {timeLeft} days
                        </Typography>
                    )}
                    {/*_____________________*/}
                    {isEditing ? (
                        <form onSubmit={submitHandler} noValidate>
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
                        </form>
                    ) : (
                        <Typography variant="overline">Notes:</Typography>
                    )}
                    <Divider />

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {modalPlant.notes}
                    </Typography>
                </CardContent>

                {/*_______BUTTONS_______*/}

                {isEditing ? (
                    <>
                        <Button color="primary" type="submit">Update Plant</Button>
                        <DeleteMyPlant id={props.id} />
                    </>
                ) : (
                    <Button
                        onClick={handleEditClick}
                        size="small"
                        color="primary"
                    >
                        <EditIcon />
                        Edit
                    </Button>
                )}
            </Card>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        plants: state.plants.plantList,
        currentPlant: state.plants.currentPlant,
    };
}

const mapDispatchToProps = {
    getPlant,
    updatePlant,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantModal);
