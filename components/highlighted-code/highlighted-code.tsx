import hljs from 'highlight.js'
import { useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import styles from './highlighted-code.module.scss'

export interface HighlightedCodeProps {
  children: string
  filename: string
  language: string
}

export default function HighlightedCode({ children, filename, language }: HighlightedCodeProps) {
  const codeRef = useRef<HTMLElement>(null)
  useEffect(() => {
    hljs.highlightBlock((findDOMNode(codeRef.current)) as HTMLElement)
  }, [])
  
  return (
    <div className={styles.component}>
      <pre>
        <code className={language} ref={codeRef}>
          {children}
        </code>
      </pre>
      <span className={styles.filename}>{filename}</span>
    </div>
  )
}
