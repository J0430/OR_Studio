import React from "react";
import styles from "./Spinner.module.scss";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner: React.FC<SpinnerProps> = ({
  sizeRem = 1.25,
  thicknessPx = 2,
  overlay = false,
  label = "Loading…",
  className = "",
  ...rest
}) => {
  const style = {
    ["--size" as any]: `${sizeRem}rem`,
    ["--thickness" as any]: `${thicknessPx}px`,
  } as React.CSSProperties;

  const core = (
    <div
      className={[styles.spinner, className].join(" ")}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={label}
      {...rest}
    >
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );

  return overlay ? <div className={styles.overlay}>{core}</div> : core;
};

export default Spinner;
