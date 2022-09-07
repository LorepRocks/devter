import { useEffect } from "react"
import Head from "next/head"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import Logo from "components/Icons/Logo"

import styles from "styles/Index.module.css"

import { loginWithGitHub } from "../firebase/client"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "../hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
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
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub width={24} height={24} fill="#fff" />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && (
            <img src="/spinner.gif" alt="loading" />
          )}
        </div>
      </section>
    </>
  )
}
