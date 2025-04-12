import { Component, createResource, For } from "solid-js";
import { render } from "solid-js/web";
import "./styles-fetch.css";

interface Member {
  id: string;
  login: string;
  avatar_url: string;
}

const getMembers = (): Promise<Member[]> =>
  // fetch(``).then((response) => response.json());
  fetch(`https://api.github.com/orgs/lemoncode/members`).then((response) =>
    response.json()
  );

const App: Component = () => {
  /**
   * mutate es una especie de setter a nivel local
   * está provista por createResource
   * y permite modificar el valor de la lista de miembros
   */
  const [members, { mutate, refetch }] = createResource(getMembers, {
    initialValue: [],
  });

  const handleDelete = (id: Member["id"]) => {
    console.log("handleDelete", id);
    mutate((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    );
  };

  /**
   * Si no usamos For, el componente se reneriza cada vez que cambia el estado,
   * es decir, cada vez que mutamos la lista de miembros borrando alguno.
   * Con For, solo se renderiza el componente que cambia.
   * En este caso, el componente que cambia es el que se borra.
   */
  return (
    <>
      <h3>Hello SolidJS - fetch</h3>
      <button onClick={refetch}>Recuperar miembros</button>
      {members.loading && <p>Loading...</p>}
      {members.error && <p>ERROR!</p>}
      <div class="list">
        <For each={members()}>
          {(member) => {
            return (
              <>
                <img src={member.avatar_url} />
                <span>{member.login}</span>
                <button onclick={() => handleDelete(member.id)}>
                  Delete member
                </button>
              </>
            );
          }}
        </For>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");

render(() => <App />, rootElement);
