import Editor from "@monaco-editor/react";
import React from "react";

const CodeEditor: React.FC = () => <Editor 
theme="vs-dark" 
language="javascript" 
height="300px" 
options={{
    wordWrap: "on",
    minimap: {enabled:false},
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine:false,
    automaticLayout: true
}}
/>

export default CodeEditor;