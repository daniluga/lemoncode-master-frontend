import React, { PropsWithChildren } from "react";
import { InputContext } from "./user-filter-context";

export interface User {
  id: number;
  name: string;
  surname: string;
}

interface ContextModel {
  users: User[];
  setUsers: (users: User[]) => void;
}

/**
 * UserModelContext interfaz que declara el contexto.
 */
export const UserContext = React.createContext<ContextModel>(undefined);

export const MembersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Estado de los usuarios.
  const [users, setUsers] = React.useState<User[]>([]);
  // Contexto del valor del input.
  const { inputValue } = React.useContext(InputContext);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${inputValue}`)
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, [inputValue]); // Cada vez que el input cambia, se hace una nueva petición.

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
