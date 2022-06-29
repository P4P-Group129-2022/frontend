import React from "react";
import { Box } from "@mui/material";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import SearchIcon from "@mui/icons-material/Search";
import { VSCODE_COLORS } from "../../theme/colors";

function VsCodeSidebar() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"5rem"}
      padding={"1rem"}
      bgcolor={VSCODE_COLORS.lightGrey}
      color={VSCODE_COLORS.sidebarIcon}
    >
      <FileCopyIcon fontSize={"large"} />
      <SearchIcon fontSize={"large"} />
    </Box>
  );
}

export default VsCodeSidebar;