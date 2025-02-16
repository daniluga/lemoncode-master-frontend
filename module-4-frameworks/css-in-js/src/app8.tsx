import React, { PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * styled-components, ya no estamos con emotion pero es muy similar
 */

const color = "aqua";

const H1 = styled.h1`
  color: ${color};
`;

const ELPEPE = styled.div`
  background-color: green;
`;

// Hasta aquí es igual que en emotion

// Ahora styled-components tiene una ventaja, podemos extender componentes
interface H2Props {
  alert: boolean;
}

const H2 = styled.h2<H2Props>`
  color: ${(props) => (props.alert ? "red" : "blue")};
  background-color: aqua;
`;

const H2_EXTENDIDO = styled(H2)`
  color: purple;
`;

// Estilar componentes
interface Props {
  className?: string;
}

const Link: React.FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <a href="/" className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  background-color: darkorange;
  font-weight: bold;
`;

export const App8 = () => {
  return (
    <>
      <H1>Hello Lemon styled-components</H1>
      <ELPEPE>El Pepe </ELPEPE>
      <H2 alert={false}>H2</H2>
      {/* Si quitamos <Props> de H2, el alert aquí abajo no haría falta. Ahora es inútil. */}
      <H2_EXTENDIDO alert={false}>H2 extendido</H2_EXTENDIDO>
      <Link>Go to lemoncoderssss</Link>
      <StyledLink>Go to lemoncoderssss</StyledLink>
    </>
  );
};
