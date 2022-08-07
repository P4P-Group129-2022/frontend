import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Breadcrumbs, Snackbar, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "@monaco-editor/react";
import AppWindowFrame from "../../components/AppWindowFrame";
import VSCodeSidebar from "../../components/VSCodeSidebar";
import VSCodeExplorer from "../../components/VSCodeExplorer";
import HTTPStatusCode from "../../constants/HTTPStatusCode";
import { modifyFile, retrieveFile } from "../../api/Api";
import { VSCODE_COLORS } from "../../theme/colors";
import { File } from "../../types/FileTypes";
import {TaskType} from "../../utils/TaskType";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import {UserContext} from "../../contexts/UserContextProvider";

function VSCodePage() {
  const [modified, setModified] = useState(false);
  const [saved, setSaved] = useState(true);
  const [saveFailSnackbarOpen, setSaveFailSnackbarOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [code, setCode] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const { checkAndAdvanceScenario } = useContext(ScenarioContext);
  const { user: { username } } = useContext(UserContext);

  useEffect(() => {
    console.log("retrieving file from the backend local repo...");
    retrieveFile(username)
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

  const handleSave = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "s" && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      console.log("save pressed.");

      if (code) {
        try {
          console.log("saving changes to the backend repo...");

          const res = await modifyFile(username, code);
          if (res.status === HTTPStatusCode.NO_CONTENT) {
            setModified(code !== files[0].contents);
            setSaved(true);
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

      checkAndAdvanceScenario(TaskType.SAVE);
    }
  };

  const handleChange = (newValue: string | undefined) => {
    if (newValue) {
      setCode(newValue);
      setSaved(false);
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
        onKeyDown={handleSave}
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
              color={modified ? VSCODE_COLORS.changedText : VSCODE_COLORS.explorerText}
            >
              {fileName}
              {modified && (
                <span
                  style={{
                    color: `${VSCODE_COLORS.changedText}BB`,
                    fontWeight: "bold",
                    marginLeft: "0.4rem"
                  }}>
                  M
                </span>
              )}
            </Typography>

            {saved ? (
              <CloseIcon fontSize={"small"} />
            ) : (
              <FiberManualRecordIcon sx={{ width: "0.75rem", height: "0.75rem" }} />
            )}
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
          value={code}
          onChange={handleChange}
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
