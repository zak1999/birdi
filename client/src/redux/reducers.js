import {combineReducers} from 'redux'

const SelectedBirdOnExplore = (state=null, action) =>{
  //when a bird is selected on the explore page, the state is changed
  if (action.type==="UPDATE_EXPLORE_BIRD") {
    return {...action.bird}
  }
  return state;
}

const userInformation = (state=null, action) => {
  if (action.type==="UPDATE_USER_INFO") {
    return {...action.user}
  }
  return state;
}

const reducers = combineReducers({
  SelectedBirdOnExplore,
  userInformation
});

export default reducers;
