import React from "react";
import { MembersProvider, UserContext } from "./members-context";
import { InputContext, InputProvider } from "./user-filter-context";

export const App: React.FC = () => {
  return (
    <>
      <InputProvider>
        <Input />
        <MembersProvider>
          <UserList />
        </MembersProvider>
        <br />
        <br />
        <MembersProvider>
          <UserList />
        </MembersProvider>
      </InputProvider>
    </>
  );
};

const UserList: React.FC = () => {
  const { users, setUsers } = React.useContext(UserContext);

  return (
    <>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => setUsers([])}>Empty array</button>
    </>
  );
};

const Input: React.FC = () => {
  const { inputValue, setInputValue } = React.useContext(InputContext);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
};
