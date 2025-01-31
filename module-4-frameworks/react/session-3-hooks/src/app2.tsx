import React from "react";

interface User {
  username: string;
  lastname: string;
  fullName: string;
}

interface Action {
  type: Actions;
  payload: any;
}

enum Actions {
  SET_USERNAME = "SET_USERNAME",
  SET_LASTNAME = "SET_LASTNAME",
  RESET = "RESET",
}

/**
 * "reducer" es una función que recibe el estado actual y una acción, y devuelve
 * el nuevo estado.
 *
 * Esto sirve para usarlo en vez de "useState" cuando el estado es más complejo
 * Con este, defines y limitas las acciones que pueden modificar el estado.
 */

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case Actions.SET_USERNAME:
      return {
        ...state, // Copia el estado actual y sobreescribe el campo "username"
        username: action.payload,
        fullName: `${action.payload} ${state.lastname}`,
      };
    case Actions.SET_LASTNAME:
      return {
        ...state,
        lastname: action.payload,
        fullName: `${state.username} ${action.payload}`,
      };
    case Actions.RESET:
      return { username: "", lastname: "", fullName: "" };
    default:
      return state;
  }
};

export const App = () => {
  const [user, dispatch] = React.useReducer(userReducer, {
    username: "Francesco",
    lastname: "Virgolini",
    fullName: "Francesco Virgolini",
  });

  return (
    <>
      Hello {user.fullName}
      <input
        value={user.username}
        onChange={(e) =>
          dispatch({ type: Actions.SET_USERNAME, payload: e.target.value })
        }
      />
      <input
        value={user.lastname}
        onChange={(e) =>
          dispatch({ type: Actions.SET_LASTNAME, payload: e.target.value })
        }
      />
    </>
  );
};
