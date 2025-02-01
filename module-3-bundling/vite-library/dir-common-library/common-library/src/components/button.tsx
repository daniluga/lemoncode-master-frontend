import { FC } from "react";
import classes from "./button.module.css";

/**
 * Para que "./button.module.css"; funcione, debemos crear el archivo:
 * ./common-library/src/vite-env.d.ts
 *
 * Con el siguiente contenido:
 * /// <reference types="vite/client" />
 */

export const Button: FC = () => {
  return <button className={classes.root}>Common button</button>;
};
