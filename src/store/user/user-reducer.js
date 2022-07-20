import USER_ACTIONS from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
};

export function userReducer(state = USER_INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
}
