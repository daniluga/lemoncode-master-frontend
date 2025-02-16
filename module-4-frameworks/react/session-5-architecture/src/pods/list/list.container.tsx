import React from "react";
import { Member } from "./list.vm";
import { ListComponent } from "./list.component";
import { getMembers } from "./api";
import { mapMembersFromApiToVm } from "./list.mappers";

interface Props {
  onSelect: (id: string) => void;
}

export const ListContainer: React.FC<Props> = (props) => {
  const { onSelect } = props;
  const [members, setMembers] = React.useState<Member[]>([]);

  React.useEffect(() => {
    getMembers().then(mapMembersFromApiToVm).then(setMembers);
  }, []);

  return <ListComponent members={members} onSelect={onSelect} />;
};
