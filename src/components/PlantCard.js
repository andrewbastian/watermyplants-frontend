import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {connect} from "react-redux"

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteMyPlant from  "./DeletePlant"
import EditPlant from "./EditPlant"
import {Route, Link} from "react-router-dom"
import {getPlantSchedule} from "../actions/plants"
import Moment from 'moment'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});
function PlantCard(props) {
  React.useEffect(()=> {
    props.getPlantSchedule(props.id)
  })
  const classes = useStyles();


  Moment.locale('en');
  var dt = props.waterSchedule.water_schedule;




  return (

    <div className="items-list-wrapper">
<Card className={classes.card}>

        <CardActionArea>
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
            <Typography variant="body2" color="textSecondary" component="p">
         <AccessTimeIcon color="primary" fontSize="small" /> {Moment(dt).format('hh:mm')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/plant/${props.id}/water`}>
          <Button size="small" color="primary">
          <EditIcon/>
            Edit Water
          </Button>
          </Link>

          <Link to={`/plant/${props.id}/edit`}>
          <Button size="small" color="primary">
          <EditIcon/>
            Edit
          </Button>
          </Link>
          <Button size="small" color="primary">
          <DeleteMyPlant id={props.id} />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    plants: state.plants.plantList,
    waterSchedule: state.plants.waterList
  };
}

const mapDispatchToProps = {
  getPlantSchedule
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlantCard);
