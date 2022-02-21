import React, { useEffect, useRef, useState } from 'react';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import * as esbuild from 'esbuild-wasm';

const App: React.FC = () => {
  const ref = useRef({})
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

  const onClick = async () => {
    if (!ref.current) return;

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    });
    console.log(result);
    
    setCode(result.outputFiles[0].text);



  };

  return (
    <div className="app-component">
      <textarea name="code" id="code" value={input} onChange={e => setInput(e.target.value)} ></textarea>
      <div className="button">
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>
        {code}
      </pre>
    </div>
  )

}

export default App;