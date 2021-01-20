import { Chip } from "@/components"
import { screen, render } from "@testing-library/react"

describe("<Chip/>", () => {
  test("should render chip's children", () => {
    const testMessage = "Lorem Ipsum"
    render(<Chip>{testMessage}</Chip>)

    expect(screen.getByText(testMessage)).toHaveTextContent(
      testMessage,
    )
  })
})
