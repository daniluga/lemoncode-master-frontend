import React from "react";

/**
 * También se puede hacer el CSS in JS de la siguiente manera, en React.
 */
const css = (styles) => {
  const className = `class-${Math.random().toString(36).substring(7)}`; // "Hash" aleatorio
  const styleElement = document.createElement("style");
  const content = `.${className} { ${styles} }`;

  styleElement.appendChild(document.createTextNode(content));
  document.head.appendChild(styleElement);

  return className;
};

const titleReact = css(`
  color: red;
  font-size: 20px;
`);

console.log(titleReact); // class-xxxxxx

export const App = () => {
  return <h1 className={titleReact}>Hello React !!</h1>;
};
