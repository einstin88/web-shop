import { createContext, useEffect, useReducer } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListerner,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_STATE = {
  currentUser: null,
};

const USER_ACTIONS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

function UserReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

export function UserProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const { currentUser } = state;
  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTIONS.SET_CURRENT_USER, user));

  useEffect(() => {
    const unSubscribe = onAuthStateChangedListerner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unSubscribe;
  }, []);

  const value = { currentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
