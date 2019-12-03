import React from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import { Link } from 'react-router-dom'

import { logoutUser } from "../actions/index"

import { connect } from 'react-redux'


function MainListItems(props) {

  const handleLogout = event => {
    event.preventDefault()
    props.logoutUser()
  }

  return(

    <div>
    <Divider />
    <List>

    <Link to='/account'>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={`Update Profile`}/>

    </ListItem>
  </Link>

    <Link to='/plant/add'>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Add a plant" />
    </ListItem>
    </Link>

    <ListItem button onClick = {()=> handleLogout(props.history)}>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
    </List>

  <Divider />
  </div>

);
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  logoutUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainListItems);
