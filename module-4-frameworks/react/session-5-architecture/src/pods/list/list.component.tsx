import React from "react";
import { Link } from "react-router-dom";
import { Member } from "./list.vm";
import { ListHeaderComponent } from "./components";

interface Props {
  members: Member[];
  onSelect: (login: string) => void;
}

export const ListComponent: React.FC<Props> = (props) => {
  const { members, onSelect } = props;

  return (
    <>
      <div className="list-user-list-container">
        <ListHeaderComponent />
        {members.map((member) => (
          <>
            <img src={member.avatarUrl} />
            <span>{member.id}</span>
            <div
              onClick={() => onSelect(member.login)}
              style={{ color: "indianred", fontWeight: "bold" }}
            >
              {member.login}
            </div>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
