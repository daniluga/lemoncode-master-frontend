const css = (styles) => {
  const className = `class-${Math.random().toString(36).substring(7)}`; // "Hash" aleatorio
  const styleElement = document.createElement("style");
  const content = `.${className} { ${styles} }`;

  styleElement.appendChild(document.createTextNode(content));
  document.head.appendChild(styleElement);

  return className;
};

const title = document.createElement("h1");
title.innerText = "Hello Lemoncoders 🍋";

const titleClass = css(`
  color: red;
  background-color: kakhi;
`);

title.className = titleClass;
document.body.appendChild(title);
