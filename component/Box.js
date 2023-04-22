import { useEffect, useState } from "react";
import styles from "../styles/index.module.css";

const Box = ({ id, handleClick, color }) => {
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    setBgColor(color);
  }, [color]);

  const styles = {
    width: "100px",
    height: "100px",
    border: "2px solid #2d2d2e",
    display: "inline-block",
    margin: "1px",
    backgroundColor: bgColor,
  };

  return (
    <div
      style={styles}
      className="box"
      id={id}
      onClick={() => handleClick(id)}
    ></div>
  );
};

export default Box;
