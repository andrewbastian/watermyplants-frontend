import React from "react";

import {
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core/";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { countdown } from "../helpers/countdown";



/*-------------------------------------------------*/
function PlantCard(props) {

    let timeLeft = countdown(props.plant.next_watering);

/*-------------------------------------------------*/
    return (
        <div className="items-list-wrapper">
            <CardMedia
                component="img"
                alt="Plant"
                height="200"
                image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557258847-chinese-evergreen-houseplant-1557258690.jpg?crop=0.883xw:0.887xh;0.0849xw,0.0821xh&resize=480:*"
                title="Plant"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.plant.name}
                </Typography>
                <Typography
                    gutterBottom
                    variant="body1"
                    component="h2"
                >
                    {props.plant.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Location: {props.plant.light}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <AccessTimeIcon color="primary" fontSize="small" /> Water in{" "}
                    {timeLeft} days
                </Typography>
            </CardContent>
        </div>
    );
}
export default PlantCard;
