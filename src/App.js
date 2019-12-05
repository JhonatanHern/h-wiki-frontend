import React from 'react'
import './App.css'
import CardNode from './CardNode'

function App() {
  return (
    <>
      <header className="header">
        Holo-wiki
      </header>
      <main>
        <CardNode content="Root node!" />
      </main>
    </>
  );
}

export default App
