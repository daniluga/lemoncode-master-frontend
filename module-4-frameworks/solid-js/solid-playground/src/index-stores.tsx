import { Component, For } from "solid-js";
import { createStore } from "solid-js/store";
import { render } from "solid-js/web";
import "./styles-fetch.css";

interface Member {
  id: string;
  login: string;
  avatar_url: string;
}

export const [store, setStore] = createStore<Member[]>([
  {
    id: "4374977",
    login: "nasdan",
    avatar_url: "https://avatars.githubusercontent.com/u/4374977?v=4",
  },
  {
    id: "113333501",
    login: "Chimalion",
    avatar_url: "https://avatars.githubusercontent.com/u/113333501?v=4",
  },
  {
    id: "43609530",
    login: "v-borrego",
    avatar_url: "https://avatars.githubusercontent.com/u/43609530?v=4",
  },
]);

const App: Component = () => {
  const handleDelete = (id: Member["id"]) => {
    console.log("handleDelete", id);
    setStore((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    );
  };

  return (
    <>
      <h3>Hello SolidJS - stores</h3>
      <div class="list">
        <For each={store}>
          {(member, index) => {
            return (
              <>
                <img src={member.avatar_url} />
                <input
                  value={member.login}
                  onInput={(e) => {
                    // el index() es una signal, es indice de la lista
                    // login es el campo que queremos modificar
                    // e.currentTarget.value es el nuevo valor
                    setStore(index(), "login", e.currentTarget.value);
                  }}
                />
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

render(
  () => (
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
      }}
    >
      <App />
    </div>
  ),
  document.getElementById("root")
);
