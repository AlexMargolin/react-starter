import App from "@/App"
import React from "react"
import ReactDOM from "react-dom"
import styles from "@/styles/global.module.scss"

const Root = document.createElement("div")
Object.assign(Root, {
  className: styles.app,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body.appendChild(Root),
)
