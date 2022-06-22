import React from "react";
import { styled } from "@mui/material/styles";
import { Button, buttonClasses } from "@mui/material";
import theme from "../../utils/Theme";

// Basis for the custom button.
const CustomStyledButton = styled(Button)(({ theme }) => ({
  [`&.${buttonClasses.root}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
    borderRadius: 1000,
    margin: "10px 20px",
    whiteSpace: "nowrap",
    minWidth: "max-content",
  },
}));

interface Props {
  size?: "small" | "medium" | "large";
  onClick: () => void;
  children: String;
  selected?: boolean;
  style?: React.CSSProperties;
}

/**
 * A custom button used throughout this application.
 * By default, it returns a large button with a large button dimensions.
 * 
 * @param size The size of the button; either "small", "medium", or "large".
 * @param onClick The function to call when the button is clicked.
 * @param children The text to display on the button.
 * @param selected Whether or not the button is selected.
 * @param style The style to apply to the button.
 * @returns A custom button.
 */
function CustomButton({
  size = "large",
  onClick,
  children,
  selected,
  style,
}: Props) {
  // Define the button size.
  const height = size === "small" ? 32 : size === "medium" ? 48 : 64;
  const width = size === "small" ? 96 : size === "medium" ? 128 : 256;
  const fontSize = size === "small" ? 12 : size === "medium" ? 16 : 20;

  return (
    <CustomStyledButton
      sx={{
        ...style,
        [`&.${buttonClasses.root}`]: {
          backgroundColor: selected && theme.palette.primary.main,
          color: selected && theme.palette.background.default,
          height,
          width,
          fontSize,
        },
      }}
      onClick={onClick}
    >
      {children}
    </CustomStyledButton>
  );
}

export default CustomButton;
