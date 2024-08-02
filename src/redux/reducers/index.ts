// redux/reducers/index.js
import { combineReducers } from 'redux';
import todosReducer from './todoReducer';

const rootReducer = combineReducers({
  todos: todosReducer
  // other reducers can go here
});

export default rootReducer;
