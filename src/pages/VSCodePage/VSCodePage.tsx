import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import AppWindowFrame from "../../components/AppWindowFrame";
import { VSCODE_COLORS } from "../../theme/colors";
import VSCodeSidebar from "../../components/VSCodeSidebar";
import VSCodeExplorer from "../../components/VSCodeExplorer";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function VSCodePage() {
  const [code, setCode] = useState(`class Solution {
    public boolean isSubsequence(String s, String t) {
        if (s.length() == 0) return true;
        int i = 0;
        for (int j = 0; j < t.length(); j++) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
                if (i >= s.length()) return true;
            }
        }
        return false;
    }
}`);

  const breadcrumbs = [
    <Typography key={1} color={"inherit"}>codebase</Typography>,
    <Typography key={2} color={"inherit"}>Main.java</Typography>
  ];

  return (
    <AppWindowFrame frameColor={VSCODE_COLORS.frame} title={"Main.java — LGI Codebase"}>
      <VSCodeSidebar />
      <VSCodeExplorer />
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        flexGrow={1}
        color={"white"}
        bgcolor={VSCODE_COLORS.textarea}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"left"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem 1rem"}
          >
            <Typography
              variant={"caption"}
              fontSize={"0.75rem"}
              fontWeight={500}
              marginRight={1}
            >
              Main.java
            </Typography>

            <CloseIcon fontSize={"small"} />
          </Box>
        </Box>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          color={VSCODE_COLORS.breadcrumbsText}
          sx={{
            padding: "0.25rem 1rem",
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>

        <Editor
          options={{
            fontSize: "14px",
          }}
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          defaultValue={code}
          onChange={(value) => value && setCode(value)}
        />
      </Box>
    </AppWindowFrame>
  );
}

export default VSCodePage;
