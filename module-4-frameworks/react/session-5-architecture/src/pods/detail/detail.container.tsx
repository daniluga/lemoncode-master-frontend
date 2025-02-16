import React from "react";
import { createDefaultMemberDetail, MemberDetail } from "./detail.vm";
import { getMemberDetails } from "./api/api";
import { mapMemberDetailFromApiToVm } from "./detail.mappers";
import { DetailComponent } from "./detail.component";

interface Props {
  id: string;
}

export const DetailContainer: React.FC<Props> = (props) => {
  const { id } = props;
  const [memberDetail, setMemberDetail] = React.useState<MemberDetail>(
    createDefaultMemberDetail()
  );
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    getMemberDetails(id).then(mapMemberDetailFromApiToVm).then(setMemberDetail);
  }, [id]);

  return (
    <div>
      <DetailComponent memberDetail={memberDetail} showInfo={visible} />
      <button onClick={() => setVisible(!visible)}>Toggle info</button>
    </div>
  );
};
