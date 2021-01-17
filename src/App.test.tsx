import App from "@/App"
import { render } from "@testing-library/react"

describe("<App/>", () => {
  test("should render app", () => {
    const { container } = render(<App />)
    expect(container.firstChild).not.toBeEmptyDOMElement()
  })
})
