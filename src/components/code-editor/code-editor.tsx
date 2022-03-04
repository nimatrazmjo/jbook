import './code-editor.css';

import Editor from "@monaco-editor/react";
import React, { useRef } from "react";

import monaco from 'monaco-editor';
import prettier from 'prettier';

import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string,
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    
    const monacoRef = useRef<any>(null);

    function handleEditorDidMount(editor:monaco.editor.IStandaloneCodeEditor, monaco:any) {
        // here is another way to get monaco instance
        // you can also store it in `useRef` for further usage
        monacoRef.current = editor; 
      }

    function handleEditorChange(value: any, event: any) {
        onChange(value);
    }

    const format = () => {
        const unformatted = monacoRef.current.getModel().getValue();

        const format = prettier.format(unformatted,{
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/,'');
        monacoRef.current.setValue(format);
    }
    return (
        <div className='editor-wrapper'>
            <button className="button button-format is-primary is-small" onClick={format}>Format</button>
            <Editor
                value={initialValue}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                theme="vs-dark"
                language="javascript"
                height="300px"
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
}

export default CodeEditor;