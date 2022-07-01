import React from "react";
import {
  Box,
  Typography
} from "@mui/material";
import { VSCODE_COLORS } from "../../theme/colors";
import { styled } from "@mui/material/styles";
import VSCodeIcon from "../VSCodeIcon";
import { File } from "../../types/FileTypes";
import VSCodeExplorerFiles from "./VSCodeExplorerFiles";

type Props = {
  files?: File[];
};

const ExplorerSectionSummary = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  borderTop: `1px solid ${VSCODE_COLORS.explorerDivider}`,
  padding: "0.1rem 0",
});

const ExplorerSectionSummaryHeader = styled(Typography)({
  fontSize: "0.75rem",
  fontWeight: 800,
  marginRight: 1,
  color: VSCODE_COLORS.explorerText,
  textTransform: "uppercase",
  userSelect: "none",
});

const ExplorerSectionSummaryIconStyle = {
  width: "1.2rem",
};

function VSCodeExplorer({ files }: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      width={"25vw"}
      bgcolor={VSCODE_COLORS.explorerGrey}
      color={VSCODE_COLORS.explorerText}
    >

      {/*  Explorer title section  */}
      <Box
        display={"flex"}
        padding={"0.5rem 1.2rem"}
        justifyContent={"space-between"}
      >
        <Typography
          fontSize={"0.75rem"}
          textTransform={"uppercase"}
          fontWeight={500}
        >
          Explorer
        </Typography>
        <VSCodeIcon iconName={"ellipsis"} />
      </Box>

      {/*  source folder  */}
      <ExplorerSectionSummary>
        <VSCodeIcon iconName={"chevron-down"} style={ExplorerSectionSummaryIconStyle} />
        <ExplorerSectionSummaryHeader>
          Open Editors
        </ExplorerSectionSummaryHeader>
      </ExplorerSectionSummary>

      {/*  source folder contents  */}
      <VSCodeExplorerFiles files={files}/>

      {/*  outline  */}
      <ExplorerSectionSummary>
        <VSCodeIcon iconName={"chevron-right"} style={ExplorerSectionSummaryIconStyle} />
        <ExplorerSectionSummaryHeader>
          Outline
        </ExplorerSectionSummaryHeader>
      </ExplorerSectionSummary>

      {/*  timeline  */}
      <ExplorerSectionSummary>
        <VSCodeIcon iconName={"chevron-right"} style={ExplorerSectionSummaryIconStyle} />
        <ExplorerSectionSummaryHeader>
          Timeline
        </ExplorerSectionSummaryHeader>
      </ExplorerSectionSummary>

    </Box>
  );
}

export default VSCodeExplorer;