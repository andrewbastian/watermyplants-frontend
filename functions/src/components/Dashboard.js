import React, { useEffect, useState, forwardRef } from "react";

import clsx from "clsx";

import { useSpring, animated } from "react-spring/web.cjs";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Grid,
    Container,
    Modal,
    Backdrop,
    CardActionArea,
    Card,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import PlantCard from "./PlantCard";
import MainListItems from "./listItems";
import PlantModal from "./PlantModal";

import { connect } from "react-redux";
import { getPlants } from "../actions/plants";
import { getPlantSchedule } from "../actions/plants";

//components
import Copyright from "./Copyright";

const StyledToolBar = withStyles({
    root: {
        background: "#078B75",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
})(Toolbar);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    card: {
        maxWidth: 345,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    fixedHeight: {
        height: 240,
    },
}));

const Fade = forwardRef(function Fade(props, ref) {
    const { in: modalOpen, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: modalOpen ? 1 : 0 },
        onStart: () => {
            if (modalOpen && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!modalOpen && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

function Dashboard(props) {

    const { getPlants } = props
    useEffect(() => {
        getPlants();
    }, [getPlants]);
    const classes = useStyles();

    /*MODAL:*/
    const [modalOpen, setModalOpen] = useState(false);

    const [modalID, setModalID] = useState();
    const handleModalOpen = (plantID) => {
        setModalID(plantID);
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    /*DRAWER:*/
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = (plant) => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let username = localStorage.getItem("username");

/*-----------------------------------------------------------------------*/
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <StyledToolBar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        welcome {username}{" "}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </StyledToolBar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <MainListItems />
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {props.plants.map((plant) => (
                            <Grid key={plant.id} item lg={4} md={7} xs={10}>
                                <Card className={classes.card}>
                                    <CardActionArea
                                        value={plant.id}
                                        key={plant.id}
                                        onClick={() =>
                                            handleModalOpen(plant.id)
                                        }
                                    >
                                        <PlantCard
                                            key={plant.id}
                                            id={plant.id}
                                            plant={plant}
                                            className={fixedHeightPaper}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Copyright />
                <Modal
                    className={classes.modal}
                    open={modalOpen}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <div className={classes.modalPaper}>
                            <PlantModal modalID={modalID} />
                        </div>
                    </Fade>
                </Modal>
            </main>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        plants: state.plants.plantList,
    };
}

const mapDispatchToProps = {
    getPlants,
    getPlantSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
