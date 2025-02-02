import styles from "./divider.module.css";
import { DividerProps } from "./divider.types";

export const Divider = ({
  width = "300px",
  lineColor = "primary",
  thickness = 6,
}: DividerProps) => {
  const dividerStyles = {
    width,
    height: `${thickness}px`,
    backgroundColor: lineColor === "primary" ? "#007bff" : "#e0e0e0",
  };

  const className = [styles.divider, lineColor !== "primary" && styles["divider-color--secondary"]]
    .filter(Boolean)
    .join(" ");

  return <hr className={className} style={dividerStyles} />;
};
