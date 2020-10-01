# WATER MY PLANTS - 

[A WEB APP](https://watermeplease.netlify.app/)

## Tech Stack:

> Authentication - JWT
> State management - Redux (react-redux, redux-form-material-ui, redux-logger, redux-thunk)
> Style: Material-UI
> Form management: material-ui-phone-number, moment, date-fns
> HTTP client: Axios

## API TESTED ENDPOINTS
____________________________________
//LOGIN -- .post("https://watermp.herokuapp.com/login")
{
    "username": "jacobcalv",
    "password": "123"
}

//REGISTER -- .post("https://watermp.herokuapp.com/register")
{
    "username": "jacobcalv",
    "password": "123",
    "phone": "1234567890"
}

//ADD PLANT -- .post("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/plants/add", "Authorization":"token")
{
    "name": "my favorite lily",
    "location": "Kitchen Floor",
    "type": "boat lily"
}

//ADD PLANT SCHEDULE -- .post("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANTS ID)/add_schedule", "Authorization":"token")

 {
    "water_schedule": "UNIX TIME ex. 1573698314 "
 }
//GET PLANT DATA (INDIVIDUAL) -- .get("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANTS ID)", "Authorization":"token")
//GET PLANT DATA FOR USER ALL -- .get("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/", "Authorization":"token")
//GET PLANT SCHEDULE (INDIVIDUAL) -- .get("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANTS ID)/schedules", "Authorization":"token")
//UPDATE PLANT DATA (NOT SCHEDULE) -- .put("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANTS ID)/update", "Authorization":"token")
{
    "name": "weird Lily",
    "location": "my Kitchen",
    "type": "boat Lily"
}
//UPDATE PLANT WATER SCHEDULE -- .put("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANT ID)/update/(YOUR WATER SCHEDULE ID -- FOUND IN POST AND GET REQUEST FOR WATER SCHEDULE )", "Authorization":"token")
{
    "water_schedule": "UNIX TIME EX.1573698310"
}
//UPDATE YOUR PHONE NUMBER -- .put("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/user_settings", "Authorization":"token")
{
    "phone": (A NEW PHONE NUMBER = ) "1236544569"
}
//DELETE PLANT -- .delete("https://watermp.herokuapp.com/dashboard/(YOUR USER ID)/my_plant/(YOUR PLANT ID)/remove", "Authorization":"token")
_____________________________________




Ask about:

no token in register object

plant plantReducer object

what is the best logic for the 3ids. how can this be helpful?

How to use props.history.params w/ connected-react-router.

------------------------------
actions still needed:

notifications
√update phone number
log out
√Update plant
√Fetch water_schedule
√update water_schedule
------------------------
issues:
[] Remove default style on sidenav

[]Create Snackbar

[√] Register and Login get 304 code on submitHandler
Resolution:

[√] 'redux-form-material-ui' - When imported to register gives error that files relating to redux-form-material-ui can not be found in node_modules. We are using yarn for this project and the docs for this dependency only list npm commands. Do some packages only run on npm or yarn?
Resolution:
we don't need to use this after all.

[√]phone number seem to be messing with other inputs -https://codesandbox.io/s/0x7mqonlw0
Resolution:
missing props on value... I think.
____________________________________
Our Code Explained:

./src>>>>>>>>>>>>>>>>>>>>>>>>

Index.js:
  react-redux
  w/ connected-react-router and {history}

configureStore.js:
  thunk
  logger
  createStore
  createBrowserHistory
  rootReducer

App.js:
  `this is where page routing for app is set up`

____________________________________
./utils>>>>>>>>>>>>>>>>>>>>>>

API.js:

  API helper set to:

  `` baseURL: "https://watermp.herokuapp.com/",
    headers: {
      Authorization: `${localStorage.getItem("token")}`
      },
      responseType: "json"
      });
      ``
____________________________________
./actions>>>>>>>>>>>>>>>>>>>>

index.js:
  `exports all from actions folder`

auth.js:
  `this is where page redirect should happen using connected-react-router:`

    dispatch(push("/dashboard"));

plants.js:

____________________________________
./reducers>>>>>>>>>>>>>>>>>>>

index.js:
  {combineReducers} from redux
  {connectRouter} from connected-react-router

  `adds authReducer and plantReducer to {history} via connectRouter`

auth.js:

plants.js:

____________________________________
./components>>>>>>>>>>>>>>>>>

Homepage.js:
 set to send user to login if they are not already signed in. If they are, it will send them to Dashboard.js

Register.js
