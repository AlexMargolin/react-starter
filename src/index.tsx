import App from "@/App"
import React from "react"
import ReactDOM from "react-dom"
import modules from "@/styles/global.module.scss"

const root = document.createElement("div")

Object.assign(root, {
  className: modules.app,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body.appendChild(root),
)
