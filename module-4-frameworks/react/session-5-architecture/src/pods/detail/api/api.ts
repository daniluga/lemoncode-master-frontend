import { MemberDetail } from "./api.model"

export const getMemberDetails = async (loginId: string): Promise<MemberDetail> => {
  return fetch(`https://api.github.com/users/${loginId}`)
      .then((response) => response.json())
}
  