import React from "react";
import { DetailRowComponent } from "./detail-row.component";

interface Props {
  login: string;
  company?: string;
  bio?: string;
}

export const MemberDetailComponent: React.FC<Props> = ({
  login,
  company,
  bio,
}) => {
  return (
    <>
      <DetailRowComponent detailLabel="Login">{login}</DetailRowComponent>
      <DetailRowComponent detailLabel="Company">
        {company ?? "N/A"}
      </DetailRowComponent>
      <DetailRowComponent detailLabel="Bio">{bio ?? "N/A"}</DetailRowComponent>
    </>
  );
};
