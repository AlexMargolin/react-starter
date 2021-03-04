import { Chip } from "@/components"
import { MutableRefObject } from "react"
import { screen, render } from "@testing-library/react"

describe("<Chip/>", () => {
  test("should render root attributes", () => {
    render(<Chip data-testid="test-id" />)

    expect(screen.getByTestId("test-id")).toBeInTheDocument()
  })

  test("should render children", () => {
    render(<Chip data-testid="test-id">children</Chip>)

    expect(
      screen.getByTestId("test-id"),
    ).not.toBeEmptyDOMElement()
  })

  test("should be able to assign ref", () => {
    const refFunc = jest.fn()
    const refObj: MutableRefObject<HTMLDivElement> = {
      current: null,
    }

    // Object type Ref
    render(<Chip ref={refObj} />)
    expect(refObj.current).not.toBeNull()

    // Function type Ref
    render(<Chip ref={refFunc} />)
    expect(refFunc).toHaveBeenCalledTimes(1)
  })
})
