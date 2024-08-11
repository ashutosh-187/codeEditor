import React from "react"
import {Editor} from './components'

function App() {

  return (
    <div className='bg-stone-200 w-full h-screen items-center flex flex-col justify-center'>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-mono font-extrabold">
          Code editor with syntax highlighting
        </h1>
      </div>
      <div className="flex items-center justify-center m-1">
        <h1 className="text-xl font-mono">
          created by: Ashutosh Tiwari
        </h1>
      </div>
      <div className="flex items-center justify-center mb-2">
        <button 
          className="bg-black text-white rounded-sm font-mono p-1 hover:bg-lime-600"
          onClick={()=>window.open("https://github.com/ashutosh-187", "_blank")}
        >
          Github
        </button>
      </div>
      <Editor />
    </div>
  )
}

export default App