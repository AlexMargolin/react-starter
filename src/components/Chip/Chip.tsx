import { FC } from "react"
import styles from "./chip.module.scss"

export interface Props {}

const Chip: FC<Props> = props => {
  return <span className={styles.chip}>{props.children}</span>
}

export default Chip
