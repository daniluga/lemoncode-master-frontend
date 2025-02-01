import React from "react";
import { getAvg } from "./average-service";
import * as classes from "./average-component-styles.scss";

export const AverageComponent: React.FC = () => {
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
    const scores: number[] = [90, 85, 95, 70];
    setAverage(getAvg(scores));
  }, []);

  return (
    <div>
      <span className={classes.resultBackground}>Students average: {average}</span>
    </div>
  );
};
