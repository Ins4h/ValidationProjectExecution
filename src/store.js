import { createStore } from "redux";

export const actionTypes = {
  addFirstName: "ADD_FIRST_NAME",
  addLastName: "ADD_LAST_NAME",
  addEmail: "ADD_EMAIL",
  addMessage: "ADD_MESSAGE",
};

const formState = (
  state = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  },
  action
) => {
  switch (action.type) {
    case actionTypes.addFirstName:
      return {
        ...state,
        firstName: action.firstName,
      };
    case actionTypes.addLastName:
      return {
        ...state,
        lastName: action.lastName,
      };
    case actionTypes.addEmail:
      return {
        ...state,
        email: action.email,
      };
    case actionTypes.addMessage:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

const store = createStore(formState);

export { store };
