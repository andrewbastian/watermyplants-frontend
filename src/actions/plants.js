import { push } from "connected-react-router";
import API from "../utils/API";

export const FETCH_PLANTS_REQUEST = "FETCH_PLANTS_REQUEST";
export const FETCH_PLANTS_SUCCESS = "FETCH_PLANTS_SUCCESS";
export const FETCH_PLANTS_FAILURE = "FETCH_PLANTS_FAILURE";

const ID = localStorage.getItem("userID");

export const getPlants = () => dispatch => {
  dispatch({ type: FETCH_PLANTS_REQUEST });

  API().get(`/dashboard/${ID}`)
    .then(response => {
      console.log(response.data)
      dispatch({
        type: FETCH_PLANTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: FETCH_PLANTS_FAILURE,
        errorMessage: error
      })
    );
};

export const FETCH_PLANT_REQUEST = "FETCH_PLANT_REQUEST";
export const FETCH_PLANT_SUCCESS = "FETCH_PLANT_SUCCESS";
export const FETCH_PLANT_FAILURE = "FETCH_PLANT_FAILURE";

export const getPlant = (props) => dispatch => {
  dispatch({ type: FETCH_PLANT_REQUEST });

  API().get(`/dashboard/${ID}/my_plant/${props.match.params}`)
    .then(response =>
      dispatch({
        type: FETCH_PLANT_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({
        type: FETCH_PLANTS_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};

export const CREATE_PLANT_REQUEST = "CREATE_PLANT_REQUEST";
export const CREATE_PLANT_SUCCESS = "CREATE_PLANT_SUCCESS";
export const CREATE_PLANT_FAILURE = "CREATE_PLANT_FAILURE";

export const createPlant = plant => dispatch => {
  dispatch({ type: CREATE_PLANT_REQUEST });
  console.log(plant)
  API().post(`/dashboard/${ID}/plants/add`, {"name": plant.name, "location": plant.location, "type": plant.type, 'id':plant.id})
    .then(response => {
      dispatch({ type: CREATE_PLANT_SUCCESS, payload: response.data });
      dispatch(push(`/plant/${response.data.id}/water`));
    })
    .catch(error => {
      dispatch({
        type: CREATE_PLANT_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};

export const UPDATE_PLANT_REQUEST = "UPDATE_PLANT_REQUEST";
export const UPDATE_PLANT_SUCCESS = "UPDATE_PLANT_SUCCESS";
export const UPDATE_PLANT_FAILURE = "UPDATE_PLANT_FAILURE";

export const updatePlant = (plant) => dispatch => {
  dispatch({ type: UPDATE_PLANT_REQUEST });
  console.log(plant)
  API().put(`/dashboard/${ID}/my_plant/${plant.id}/update`, {"name": plant.name, "location": plant.location, "type": plant.type})
    .then(response => {
      dispatch({ type: UPDATE_PLANT_SUCCESS, payload: response.data });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PLANT_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};

export const DELETE_PLANT_REQUEST = "DELETE_PLANT_REQUEST";
export const DELETE_PLANT_SUCCESS = "DELETE_PLANT_SUCCESS";
export const DELETE_PLANT_FAILURE = "DELETE_PLANT_FAILURE";

export const deletePlant = (plant) => dispatch => {
  dispatch({ type: DELETE_PLANT_REQUEST });
  console.log(plant.id)
  API().delete(`/dashboard/${ID}/my_plant/${plant.id}/remove`)
    .then(response => {
      dispatch({ type: DELETE_PLANT_SUCCESS });
      dispatch(push("/"));
    })
    .catch(error =>
      dispatch({
        type: DELETE_PLANT_FAILURE,
        errorMessage: error.response.data
      })
    );
};

export const CREATE_PLANT_SCHEDULE_REQUEST = "CREATE_PLANT_SCHEDULE_REQUEST";
export const CREATE_PLANT_SCHEDULE_SUCCESS = "CREATE_PLANT_SCHEDULE_SUCCESS";
export const CREATE_PLANT_SCHEDULE_FAILURE = "CREATE_PLANT_SCHEDULE_FAILURE";

export const createPlantSchedule = (props) => dispatch => {
  dispatch({ type: CREATE_PLANT_SCHEDULE_REQUEST });
  console.log(props)
  API().post(`/dashboard/${ID}/my_plant/${props.plant_id}/add_schedule`, {'water_schedule': props.water_schedule})
    .then(response => {
      dispatch({ type: CREATE_PLANT_SCHEDULE_SUCCESS, payload: response.data });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({
        type: CREATE_PLANT_SCHEDULE_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};

export const FETCH_PLANT_SCHEDULE_REQUEST = "FETCH_PLANT_SCHEDULE_REQUEST";
export const FETCH_PLANT_SCHEDULE_SUCCESS = "FETCH_PLANT_SCHEDULE_SUCCESS";
export const FETCH_PLANT_SCHEDULE_FAILURE = "FETCH_PLANT_SCHEDULE_FAILURE";
const PlantID = localStorage.getItem("plantID");

export const getPlantSchedule = (props) => dispatch => {
  dispatch({ type: FETCH_PLANT_SCHEDULE_REQUEST });
  console.log(props)
  API().get(`/dashboard/${ID}/my_plant/${props}/schedules`)
  .then(response =>
    dispatch({
      type: FETCH_PLANT_SCHEDULE_SUCCESS,
      payload: response.data
    })

    )
    .catch(error => {
      dispatch({
        type: FETCH_PLANT_SCHEDULE_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};

export const UPDATE_PLANT_SCHEDULE_REQUEST = "UPDATE_PLANT_SCHEDULE_REQUEST";
export const UPDATE_PLANT_SCHEDULE_SUCCESS = "UPDATE_PLANT_SCHEDULE_SUCCESS";
export const UPDATE_PLANT_SCHEDULE_FAILURE = "UPDATE_PLANT_SCHEDULE_FAILURE";

export const updatePlantSchedule = (schedule, props) => dispatch => {
  dispatch({ type: UPDATE_PLANT_SCHEDULE_REQUEST });

  API().put(`/dashboard/${ID}/my_plant/${PlantID}/update/${props.waterID}`, schedule)
    .then(response => {
      dispatch({ type: UPDATE_PLANT_SCHEDULE_SUCCESS, payload: response.data });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PLANT_SCHEDULE_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};
