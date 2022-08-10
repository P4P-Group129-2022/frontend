import { Button as MuiButton, ButtonProps, styled } from "@mui/material";
import React from "react";

export default styled((props: ButtonProps) => (
  <MuiButton color={"secondary"} size={"large"} variant={"contained"} {...props} />
))({
  fontSize: "1.125rem",
  margin: "4px 12px",
  borderRadius: 1000,
});
