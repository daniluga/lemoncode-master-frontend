import React, { PropsWithChildren } from "react";
import { MemberEntity } from "./model";
import { MemberRow } from "./member-row.component";

export const MemberList: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>(undefined);

  React.useEffect(() => {
    fetch("https://api.github.com/orgs/lemoncode/members")
      .then((response) => response.json())
      .then((result) => setMembers(result));
  }, []);

  return (
    /**
     * <> Hace la trampilla de ser el "elemento padre" para poder devolver varios elementos
     * React.Fragment es lo mismo que <> pero más explícito
     *
     * Con <> (fantasmita) sale error en la consola (algo de keys), con React.Fragment no.
     *
     * className es una propiedad inherente de React, no de HTML
     */
    // <>
    <div className="user-list-container">
      <span className="header">Picture</span>
      <span className="header">Id</span>
      <span className="header">Login</span>
      {members?.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
    // </>
  );
};
