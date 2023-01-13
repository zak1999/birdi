import {combineReducers} from 'redux'

const SelectedBirdOnExplore = (state=null, action) =>{
  //given a bird in action, the state is changed

  if (action.type==="UPDATE_EXPLORE_BIRD") {
    return {...action.bird}
  }
  return state;
}


const reducers = combineReducers({
  SelectedBirdOnExplore,
});

export default reducers;
