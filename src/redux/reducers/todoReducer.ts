// redux/reducers/todos.js
import { ADD_TODO } from "../actions/todo";

const initialState = {
  todos: []
};

function todosReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
}

export default todosReducer;
