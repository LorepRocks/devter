import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import GitHub from '../components/Icons/GitHub'
import styles from '../styles/Home.module.css'
import {loginWithGitHub, onAuthStateChanged } from '../firebase/client'

export default function Home() {

  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub().then(user => {
      console.log(user)
      setUser(user)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
            <section className={styles.wrap}>
                <Image src='/devter-logo.png' layout='fixed' width={180} height={180}></Image>
                <h1 className={styles.title}>Devter</h1>
                <h2 className={styles.subtitle}>
                    <span>Talk about development with developers</span> 👩🏻‍💻👨🏻‍💻</h2>
                <div>
                  {
                    user === null &&
                      <Button onClick={handleClick}>
                          <GitHub width={24} height={24} fill="#fff"/>
                          Login with GitHub
                      </Button> 
                  }
                  {
                    user && user.avatar && 
                    <div>
                      <img src={user.avatar} alt='avatar'></img>
                      <h3>{user.username}</h3>
                      </div>
                  }
                </div>
            </section>
        </main>
      </div>

    </>
  )
}