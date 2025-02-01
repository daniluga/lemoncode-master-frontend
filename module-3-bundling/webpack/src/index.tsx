// import getAvgRenamed from "./average-service.js";
// import "./mystyles.scss";
// import logoImg from "./content/logo_1.png";

// const scores = [90, 685, 150, 199, 194, 30];
// const averageScore = getAvgRenamed(scores);
// const messageToDisplay = `average score ${averageScore}`;

// document.write(messageToDisplay);

// const img = document.createElement("img");
// img.src = logoImg;
// document.getElementById("imgContainer").appendChild(img);

/**
 * BABEL es un colega de webpack (compilador de JS), que permite convertir
 * código de JS moderno a JS antiguo, para que sea compatible con más avegadores.
 *
 * npm install @babel/cli @babel/core @babel/preset-env --save-dev
 *
 * --save-dev: Se instala como dependencia de desarrollo. No se necesita en producción.
 *
 * Hay que decirle a webpack que use a su colega babel. Creamos un archivo
 * .babelrc y un archivo webpack.config.js.
 *
 * Cambiar el entry point:
 * Por defecto es index.js.
 * Para cambiarlo, pornemos en el archivo webpack.config.js:
 * entry: './src/students.js'
 *
 * export default: Permite exportar una función, variable, clase, etc. por defecto.
 *
 * instalar servidor de webpack: npm install webpack-dev-server --save-dev
 * npm run start y levantamos el servidor en local.
 *
 * instalamos plugin de html para webpack: npm install html-webpack-plugin --save-dev
 * esto nos permite generar un archivo html en la carpeta dist, con el script de webpack.
 */

import React from "react";
import {createRoot} from "react-dom/client";
import { AverageComponent } from "./average-component";
import { TotalScoreComponent } from "./total-score-component";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Hello from React</h1>
    <AverageComponent />
    <TotalScoreComponent />
  </div>
);