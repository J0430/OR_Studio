// components/common/SendButton/SendButtonIcon.tsx
import React from "react";
import type { ArrowDirection } from "./SendButton.types";
import styles from "./SendButton.module.scss";

/** Pure CSS arrow (two borders), rotated via direction class */
export const SendButtonIcon: React.FC<{
  direction: ArrowDirection;
  className?: string;
}> = ({ direction, className }) => {
  // Direction class controls rotation & subtle offsets
  return (
    <span
      aria-hidden="true"
      className={[
        styles.arrowIcon,
        styles[`dir_${direction}`],
        className ?? "",
      ].join(" ")}
    />
  );
};

export default SendButtonIcon;
