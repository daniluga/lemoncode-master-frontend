/**
 * Emotion genérico.
 */
import React from "react";
import { css } from "@emotion/css";

export const AppEmotion = () => {
  return <h1 className={myClassName}>Hello React !!</h1>;
};

const color = "darkblue";

const myClassName = css`
  color: ${color};
  font-size: 20px;
`;
