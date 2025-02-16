import { Member } from "./api.model";

export const getMembers = async (): Promise<Member[]> => {
  return fetch("https://api.github.com/orgs/lemoncode/members").then((response) =>
    response.json()
  );
}