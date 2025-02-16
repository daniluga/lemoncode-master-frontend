export interface AuthContextModel {
  user: string;
  onLogin: (user: string) => void;
}
