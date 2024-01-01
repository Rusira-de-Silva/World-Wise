import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: "",
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(username, password) {
    if (username === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    } else {
      throw new Error("Invalid username or password");
    }
  }

  function logout() {
    dispatch({
      type: "logout",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
