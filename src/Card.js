import React from 'react'
import MarkdownRenderer from 'react-markdown-renderer'

import './App.css'

function Card({content,onClick}) {
  console.log(content)
  return (
    <div className="card" onClick={onClick}>
        <h2>{content.data && content.data.getPage.title}</h2>
        {content.data && <MarkdownRenderer markdown={content.data.getPage.content} /> }
    </div>
  );
}

export default Card
