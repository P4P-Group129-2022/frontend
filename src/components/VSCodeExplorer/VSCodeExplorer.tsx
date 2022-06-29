import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Typography
} from "@mui/material";
import { VSCODE_COLORS } from "../../theme/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";

type Props = {
//  So far, no props but add when need rises at a later date.
};

const ExplorerSectionContainer = styled((props: AccordionProps) => (
  <Accordion square disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  backgroundColor: "inherit",
  color: "inherit",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const ExplorerSectionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon
      fontSize={"small"}
      sx={{ color: VSCODE_COLORS.explorerText }}
    />}
    {...props}
  />
))(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

function VSCodeExplorer({}: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      width={"25vw"}
      bgcolor={VSCODE_COLORS.explorerGrey}
      color={VSCODE_COLORS.explorerText}
    >
      <Box
        display={"flex"}
        padding={"0.5rem 1rem"}
        justifyContent={"space-between"}
      >
        <Typography
          variant={"caption"}
          fontSize={"1rem"}
          textTransform={"uppercase"}
        >
          Explorer
        </Typography>
        <MoreHorizIcon fontSize={"medium"} />
      </Box>
      <ExplorerSectionContainer>
        <ExplorerSectionSummary>
          <Typography
            variant={"caption"}
            fontSize={"1rem"}
            textTransform={"uppercase"}
          >
            Open Editors
          </Typography>
        </ExplorerSectionSummary>
        <AccordionDetails>
          <Typography>Main.java</Typography>
        </AccordionDetails>
      </ExplorerSectionContainer>
    </Box>
  );
}

export default VSCodeExplorer;