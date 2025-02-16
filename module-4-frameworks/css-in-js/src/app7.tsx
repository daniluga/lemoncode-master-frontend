import React from "react";
import styled from "@emotion/styled";

/**
 * Emotion styled
 */

const color = "aqua";

const H1 = styled.h1`
  color: ${color};
`;

const ELPEPE = styled.div`
  background-color: green;
`;

export const App7 = () => {
  return (
    <>
      <H1>Hello Lemon</H1>
      <ELPEPE>El Pepe</ELPEPE>
    </>
  );
};
