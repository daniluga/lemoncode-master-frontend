import React from "react";

/**
 * Ahora tenemos name + surname, pero imagina que tenemos 10 campos más.
 * Vamos a hacer un objeto.
 */

interface Person {
  name: string;
  surname: string;
}

export const Demo: React.FC = () => {
  const [person, setPerson] = React.useState<Person>({
    name: "John",
    surname: "Salchichon",
  });

  return (
    <>
      <h4>
        {person.name} - {person.surname}
      </h4>
      <input
        type="text"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <input
        type="text"
        value={person.surname}
        onChange={(e) => setPerson({ ...person, surname: e.target.value })}
      />
    </>
  );
};
