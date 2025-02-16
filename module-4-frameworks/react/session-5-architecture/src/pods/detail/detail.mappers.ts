import * as am from "./api/api.model";
import * as vm from "./detail.vm";

export const mapMemberDetailFromApiToVm = (data: am.MemberDetail): vm.MemberDetail => ({
  id: data.id,
  login: data.login,
  name: data.name,
  company: data.company,
  bio: data.bio,
  avatarUrl: data.avatar_url
});
