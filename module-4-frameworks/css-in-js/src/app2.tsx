import React from "react";
import { css } from "@emotion/react";

export const App2: React.FC = () => {
  const [value, setValue] = React.useState("darkblue");
  const [color, setColor] = React.useState(value);

  const myTitleClassName = css`
    color: ${color};
    font-size: 20px;

    // Se puede usar SASS en Emotion
    &:hover {
      background-color: purple;
    }
  `;

  const inputClass = css`
    background-color: ${color};
    color: white;
  `;

  return (
    <div>
      <h1 css={myTitleClassName}>
        Hello from App2.tsx
        <input
          css={inputClass}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            setColor(value);
          }}
        >
          Apply
        </button>
      </h1>
    </div>
  );
};
