import styles from "styles/Home.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

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
              username={devit.username}
              avatar={devit.avatar}
              message={devit.message}
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
