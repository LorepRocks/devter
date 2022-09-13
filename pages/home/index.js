import styles from "styles/Home.module.css"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import Link from "next/link"
import { fetchLatestDevits } from "../../firebase/client"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Head from "next/head"
const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <section className={styles.section}>
        <header className={styles.header}>
          <h2>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map((devit) => (
            <Devit
              key={devit.id}
              createAt={devit.createAt}
              userName={devit.userName}
              avatar={devit.avatar}
              content={devit.content}
              id={devit.id}
              img={devit.img}
            />
          ))}
        </section>

        <nav className={styles.nav}>
          <Link href="/home">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </section>
    </>
  )
}

export default HomePage
