import React, { useState } from "react";
import Editor from "@monaco-editor/react";

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

  return (
    <div
      style={{
        width: "100vw",
        height: "100%"
      }}
    >
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
    </div>
  );
}

export default VSCodePage;
