import React from "react";
import "@vscode/codicons/dist/codicon.css";

type Props = {
  iconName: string;
  className?: string;
  style?: React.CSSProperties;
};

function VSCodeIcon({ iconName, className, style }: Props) {
  return (
    <i className={`codicon codicon-${iconName} ${className}`}
       style={{ display: "flex", alignItems: "center", justifyContent: "center", ...style }} />
  );
}

export default VSCodeIcon;