import { createStore } from "redux";

const userReducer = (state = { currentUser: {}}, action) => {
  if (action.type === "setUser") {
    return {
      currentUser: action.value,
    };
  }
  return state;
};

const store = createStore(userReducer);

export default store;