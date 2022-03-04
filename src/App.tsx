import React, { useEffect, useRef, useState } from 'react';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import * as esbuild from 'esbuild-wasm';

const App: React.FC = () => {
  const ref = useRef({})
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
    ref.current = true
  }

  useEffect(() => {
    startService();
  }, [ref])

  const onClick = async (input: string ) => {
    if (!ref.current) return;
    iframe.current.srcdoc = html;
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)]
    });
    
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text,'*')



  };


  const html = `
  <html>
  <header>
    
  </header>
  <body>
    <div id="root"></div>
    <script> window.addEventListener('message', (event)=>{
      try {
        
        eval(event.data)
      } catch(err) {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }
    },false)</script>
  </body>
  </html
  `;
  return (
    <div className="app-component">
      <textarea name="code" id="code" value={input} onChange={e => {setInput(e.target.value);onClick(e.target.value)}} ></textarea>
      <div className="button">
      </div>
      <iframe title='Code preview' ref={iframe} srcDoc={html}> {code}</iframe>
    </div>
  )

}



export default App;