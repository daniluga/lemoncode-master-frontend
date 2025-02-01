import React from "react";
import { greet } from "./greet-service";
import * as classes from "./greet-component-styles.scss";

export const GreetComponent = () => {
  const [greeting, setGreeting] = React.useState("");

  React.useEffect(() => {
    setGreeting(greet());
  }, []);

  return (
    <div>
      <span className={classes.test}>{greeting}</span>
    </div>
  );
};