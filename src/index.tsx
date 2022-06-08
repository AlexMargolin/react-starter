import App from "@/App"
import React from "react"
import { createRoot } from "react-dom/client"
import modules from "@/styles/global.module.scss"

const root = document.createElement("div")

Object.assign(root, {
  className: modules.app,
})

createRoot(document.body.appendChild(root)).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
