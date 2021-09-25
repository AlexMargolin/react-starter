import App from "@/App"
import { render } from "@testing-library/react"

describe("<App/>", () => {
  test("should render app without errors", () => {
    expect(() => render(<App />)).not.toThrowError()
  })
})
