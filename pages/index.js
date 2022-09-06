import { useEffect, useState } from "react"
import Head from "next/head"

import Avatar from "components/Avatar"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import Logo from "components/Icons/Logo"

import styles from "styles/Index.module.css"

import { loginWithGitHub, onAuthStateChanged } from "../firebase/client"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        console.log(user)
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.wrap}>
        <Logo width={100} />
        <h1 className={styles.title}>Devter</h1>
        <h2 className={styles.subtitle}>
          <span>Talk about development with developers</span> 👩🏻‍💻👨🏻‍💻
        </h2>
        <div>
          {user === null && (
            <Button onClick={handleClick}>
              <GitHub width={24} height={24} fill="#fff" />
              Login with GitHub
            </Button>
          )}
          {user && user.avatar && (
            <div>
              <Avatar
                src={user.avatar}
                alt={user.username}
                text={user.username}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
