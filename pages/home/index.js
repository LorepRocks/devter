import styles from "styles/Home.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => (
            <Devit
              key={devit.id}
              createAt={devit.createAt}
              userName={devit.userName}
              avatar={devit.avatar}
              content={devit.content}
              id={devit.id}
            />
          ))}
        </section>

        <nav className={styles.nav}></nav>
      </section>
    </>
  )
}

export default HomePage
