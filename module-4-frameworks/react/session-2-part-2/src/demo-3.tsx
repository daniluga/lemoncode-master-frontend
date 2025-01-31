import React from "react";
import { useDebounce } from "use-debounce";

const useUserList = () => {
  const [filter, setFilter] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [filterDebounced] = useDebounce(filter, 1000);

  React.useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/users?name_like=${filterDebounced}`
    )
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, [filterDebounced]);

  return { filter, setFilter, users };
};

export const Demo3: React.FC = () => {
  const { filter, setFilter, users } = useUserList();

  return (
    <>
      <h4>Usar hooks de terceros</h4>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};
