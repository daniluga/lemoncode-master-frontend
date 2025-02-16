export interface MemberDetail {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
  avatarUrl: string;
}

export const createDefaultMemberDetail = (): MemberDetail => ({
  id: "",
  login: "",
  name: "",
  company: "",
  bio: "",
  avatarUrl: "",
});