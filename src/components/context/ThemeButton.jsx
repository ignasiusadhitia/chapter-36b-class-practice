import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeButton = () => {
  const theme = useTheme();
  return <button style={{ backgroundColor: theme }}>Click Me</button>;
};

export default ThemeButton;
