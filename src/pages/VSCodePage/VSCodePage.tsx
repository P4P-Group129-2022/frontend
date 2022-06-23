import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function VSCodePage() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={code}
        onChange={(value) => value && setCode(value)}
      />
    </div>
  );
}

export default VSCodePage;
