import React from "react";
import { Box, Typography } from "@mui/material";
import { File } from "../../types/FileTypes";
import { styled } from "@mui/material/styles";
import { VSCODE_COLORS } from "../../theme/colors";

type Props = {
  file: File;
  indentationLevel?: number;
  children?: React.ReactNode;
};

const ExplorerFileContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  margin: "0.05rem 0",
});

const ExplorerFileHeader = styled(Typography)({
  fontSize: "0.8rem",
  fontWeight: 500,
  color: VSCODE_COLORS.explorerText,
  userSelect: "none",
});

function VSCodeExplorerFileItem({ file, children }: Props) {
  return (
    <Box>
      <ExplorerFileContainer>
        <ExplorerFileHeader marginLeft={!file.isFolder ? "1rem" : "0px"} paddingLeft={!file.isFolder ? "20px" : "4px"}>{file.name}</ExplorerFileHeader>
      </ExplorerFileContainer>
      {children}
    </Box>
  );
}

export default VSCodeExplorerFileItem;