import * as am from "./api/api.model";
import * as vm from "./list.vm";

export const mapMembersFromApiToVm = (data: am.Member[]): vm.Member[] =>
  data.map(mapMemberFromApiToVm);


export const mapMemberFromApiToVm = (data: am.Member): vm.Member => ({
  id: data.id,
  login: data.login,
  avatarUrl: data.avatar_url,
})