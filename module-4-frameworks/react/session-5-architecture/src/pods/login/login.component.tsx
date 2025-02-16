import React from "react";
import { createEmptyLogin, LoginVM } from "./login.vm";

interface Props {
  onSubmit: (username: string, password: string) => void;
}

export const LoginComponent: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const [loginVM, setLoginVM] = React.useState(createEmptyLogin);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(loginVM.username, loginVM.password);
  };

  /**
   * Currying function
   */
  const handleChange =
    (field: keyof LoginVM) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginVM({
        ...loginVM,
        [field]: e.target.value,
      });
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hello from login page</h2>
      <div>
        <div>
          <label>Username: </label>
          <input value={loginVM.username} onChange={handleChange("username")} />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={loginVM.password}
            onChange={handleChange("password")}
          />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
