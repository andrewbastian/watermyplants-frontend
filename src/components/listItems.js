import React, {useState} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Link } from 'react-router-dom'
import {
  logoutUser,
  authenticateUser } from "../actions/index"
import {connect} from 'react-redux'


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
      <ListItemText primary={`Hello, `}/>
      {/* ${props.user.username} */}
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
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  logoutUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainListItems);
