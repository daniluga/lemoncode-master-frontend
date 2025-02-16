import React from "react";
import { Link } from "react-router-dom";
import { routes } from "@/router";
import { MemberDetail } from "./detail.vm";

interface Props {
  memberDetail: MemberDetail;
  showInfo: boolean;
}

export const DetailComponent: React.FC<Props> = (props: Props) => {
  const { memberDetail, showInfo } = props;
  return (
    <div>
      <h2>{memberDetail.name}</h2>
      <img src={memberDetail.avatarUrl} alt="avatar" />
      {showInfo && (
        <>
          <p> id: {memberDetail.id}</p>
          <p> login: {memberDetail.login}</p>
          <p> company: {memberDetail.company}</p>
          <p> bio: {memberDetail.bio}</p>
        </>
      )}
      <Link to={routes.list}>Back to list page</Link>
    </div>
  );
};
