import React from "react";
import { MemberEntity } from "./model";

/**
 * De "members" pasamos a "props" porque ahora es un componente, en "props",
 * se recogen TODOS los parámetros que se le pasan al componente.
 */

interface Props {
  member: MemberEntity;
}

export const MemberRow = ({ member }: Props) => {
  return (
    <>
      <img src={member.avatar_url} />
      <span>{member.login}</span>
      <span>{member.id}</span>
    </>
  );
};
