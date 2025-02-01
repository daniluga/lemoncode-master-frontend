import React from "react";
import {getTotalScore} from "./average-service";
import * as classes from "./total-score-component-styles.scss";
import logo from "./content/logo_1.png";

export const TotalScoreComponent: React.FC = () => {
  const [totalScore, setTotalScore] = React.useState(0);

  React.useEffect(() => {
    const scores = [90, 85, 95, 70];
    setTotalScore(getTotalScore(scores));
  }, []);

  return (
    <div>
      <img src={logo} alt="logo" style={{width: 150}}/>
      <span className={classes.resultBackground}>
        Students total score: {totalScore} 
      </span>
    </div>
  );
}