import { FC } from "react"
import { Chip } from "@/components"
import styles from "./home.module.scss"
import sprite from "@/assets/sprite.svg"

export interface Props {}

const Home: FC<Props> = props => (
  <div className={styles.home}>
    <svg className={styles.homeLogo} aria-hidden="true">
      <use xlinkHref={`${sprite}#svg-logo`} />
    </svg>

    <h1 className={styles.homeHeading}>
      A minimal <Chip>React</Chip> Starter
    </h1>

    <a
      target="_blank"
      rel="noreferrer"
      className={styles.homeLink}
      aria-label="Visit the github repository page"
      href="https://github.com/AlexMargolin/react-starter"
    >
      <svg className={styles.homeLinkIcon} aria-hidden="true">
        <use xlinkHref={`${sprite}#svg-github`} />
      </svg>
    </a>
  </div>
)

export default Home
