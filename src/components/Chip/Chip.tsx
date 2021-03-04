import css from "./chip.module.scss"
import { forwardRef, HTMLAttributes } from "react"

export type Props = HTMLAttributes<HTMLSpanElement>

export default forwardRef<HTMLSpanElement, Props>(function Chip(
  props,
  ref,
) {
  const { children, ...rest } = props

  return (
    <span ref={ref} className={css.chip} {...rest}>
      {children}
    </span>
  )
})
