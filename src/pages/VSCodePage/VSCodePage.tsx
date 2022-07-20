import React, { useEffect, useState } from "react";
import { Alert, Box, Breadcrumbs, Snackbar, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "@monaco-editor/react";
import AppWindowFrame from "../../components/AppWindowFrame";
import VSCodeSidebar from "../../components/VSCodeSidebar";
import VSCodeExplorer from "../../components/VSCodeExplorer";
import HTTPStatusCode from "../../constants/HTTPStatusCode";
import { modifyFile, retrieveFile } from "../../api/Api";
import { VSCODE_COLORS } from "../../theme/colors";
import { File } from "../../types/FileTypes";

function VSCodePage() {
  const [modified, setModified] = useState(false);
  const [saveFailSnackbarOpen, setSaveFailSnackbarOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [code, setCode] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    retrieveFile("testUser")
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setFiles(data);
        setCode(data[0].contents);
        setFileName(data[0].name);
      });
  }, []);

  const breadcrumbs = [
    <Typography key={1} color={"inherit"}>codebase</Typography>,
    <Typography key={2} color={"inherit"}>{fileName}</Typography>
  ];

  const preventSave = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "s" && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();

      if (code) {
        try {
          const res = await modifyFile("testUser", code);
          if (res.status === HTTPStatusCode.NO_CONTENT) {
            setModified(false);
            console.log("file saved to the backend repo.");
          } else {
            console.log("file save failed.");
            console.log("status: ", res.status);
            setSaveFailSnackbarOpen(true);
          }
        } catch (err) {
          console.log("file save failed.");
          console.log("error: ", err);
          setSaveFailSnackbarOpen(true);
        }
      }
    } else {
      !modified && setModified(true);
    }
  };

  const handleSaveFailSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSaveFailSnackbarOpen(false);
  };

  return (
    <AppWindowFrame frameColor={VSCODE_COLORS.frame} title={`${fileName} — LGI Codebase`}>
      <VSCodeSidebar />
      <VSCodeExplorer files={files} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        flexGrow={1}
        color={"white"}
        bgcolor={VSCODE_COLORS.textarea}
        onKeyDown={preventSave}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"left"}
          alignItems={"center"}
          bgcolor={VSCODE_COLORS.explorerGrey}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem 1rem"}
            bgcolor={VSCODE_COLORS.textarea}
          >
            <Typography
              fontSize={"0.8rem"}
              fontWeight={600}
              marginRight={1}
            >
              {fileName}
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
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue={code}
          onChange={(value) => value && setCode(value)}
        />

        <Snackbar
          open={saveFailSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleSaveFailSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={"error"}
            onClose={handleSaveFailSnackbarClose}
            sx={{ width: "100%" }}
          >
            File save failed! Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </AppWindowFrame>
  );
}

export default VSCodePage;
