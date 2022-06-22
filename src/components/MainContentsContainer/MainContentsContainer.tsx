import { styled } from "@mui/material";

/**
 * Div container used to wrap the main contents of the page, which is contents below header and above buttons.
 * Using this component ensures that buttons which follow this component are placed in an identical location.
 */
export default styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "60vh",
  width: "100%",
});
