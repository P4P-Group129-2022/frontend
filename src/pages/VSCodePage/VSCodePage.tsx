import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import AppWindowFrame from "../../components/AppWindowFrame";
import { VSCODE_COLORS } from "../../theme/colors";
import VSCodeSidebar from "../../components/VSCodeSidebar";
import VSCodeExplorer from "../../components/VSCodeExplorer";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { File } from "../../types/FileTypes";
import { retrieveFile } from "../../api/Api";

// const dummyfiles: File[] = [
//   {
//     name: "new folder",
//     isFolder: true,
//     folderContents: [
//       {
//         name: "new folder2",
//         isFolder: true,
//         folderContents: [
//           {
//             name: "new file3.md",
//             isFolder: false,
//             contents: "hhehe",
//           }
//         ]
//       },
//       {
//         name: "new file.md",
//         isFolder: false,
//         contents: "hhehe",
//       },
//       {
//         name: "new file2.md",
//         isFolder: false,
//         contents: "hhehe",
//       },
//     ],
//   },
//   {
//     name: "dummy.txt",
//     isFolder: false,
//     contents: "hehe xd hello world",
//   },
//   {
//     name: "main.py",
//     isFolder: false,
//     contents: "def main():\n    print('hello world')",
//   }
// ];

function VSCodePage() {
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

  const preventSave = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "s" && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();

    }
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
      </Box>
    </AppWindowFrame>
  );
}

export default VSCodePage;
