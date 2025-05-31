interface UserSession {
  connectionId: string;
  nickname: string;
  room: string;
}

export interface ConnectionConfig {
  nickname: string;
  room: string;
}

let userSessions: UserSession[] = [];
let userSession = [];

const isNicknameUsed = (newUserNickname: string): boolean =>
  userSessions.some(
    (session) =>
      session.nickname.toLowerCase() === newUserNickname.toLowerCase()
  );

export const addUserSession = (
  connectionId: string,
  config: ConnectionConfig
): boolean => {
  if (isNicknameUsed(config.nickname)) {
    console.log(`Nickname '${config.nickname}' is already in use`);
    return false;
  } else {
    userSessions = [
      ...userSessions,
      { connectionId, nickname: config.nickname, room: config.room },
    ];
    console.log(`New user joined: ${config.nickname}`);
    return true;
  }
};

export const getUserInfo = (connectionId: string): UserSession => {
  const session = userSession.find(
    (session) => session.connectionId === connectionId
  );
  return session
    ? {
        connectionId: session.connectionId,
        nickname: session.config.nickname,
        room: session.config.room,
      }
    : { connectionId: '-1', nickname: 'ANONYMOUS :-@', room: 'devops' };
};
