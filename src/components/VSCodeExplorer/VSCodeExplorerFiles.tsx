import React from "react";
import { File } from "../../types/FileTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box
} from "@mui/material";
import VSCodeExplorerFileItem from "./VSCodeExplorerFileItem";
import { styled } from "@mui/material/styles";
import VsCodeIcon from "../VSCodeIcon";
import { VSCODE_COLORS } from "../../theme/colors";

type Props = {
  files?: File[];
};

const ExplorerSectionContainer = styled((props: AccordionProps) => (
  <Accordion square disableGutters elevation={0} {...props} />
))(({
  backgroundColor: "inherit",
  color: "inherit",
  border: "none",
}));

const ExplorerSectionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<VsCodeIcon iconName={"chevron-right"} style={{ color: VSCODE_COLORS.explorerText }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  minHeight: 0,
  height: "fit-content",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    margin: 0,
  },
}));

const ExplorerSectionDetails = styled(AccordionDetails)({
  margin: "0 0.5rem",
  padding: 0,
});

function VSCodeExplorerFiles({ files }: Props) {
  const mapFiles = (files?: File[]) =>
    files && files.map((file, index) =>
      file.isFolder ? (
        <ExplorerSectionContainer variant={"outlined"} square>
          <ExplorerSectionSummary>
            <VSCodeExplorerFileItem key={`folder-${file.name}-${index}`} file={file} />
          </ExplorerSectionSummary>
          <ExplorerSectionDetails>
            {mapFiles(file.folderContents)}
          </ExplorerSectionDetails>
        </ExplorerSectionContainer>
      ) : (
        <VSCodeExplorerFileItem key={`item-${index}-${file.name}`} file={file} />
      )
    );

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      {mapFiles(files)}
    </Box>
  );
}

export default VSCodeExplorerFiles;