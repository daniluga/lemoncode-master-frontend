export const login = (username: string, password: string): Promise<boolean> => {
  return Promise.resolve(username === "admin" && password === "test");
}