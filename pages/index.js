import { style } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import GitHub from '../components/Icons/GitHub'
import styles from '../styles/Home.module.css'

export default function Home() {

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
                    <Button>
                        <GitHub width={24} height={24} fill="#fff"/>
                        Login with GitHub
                    </Button>
                </div>
            </section>
        </main>
      </div>

    </>
  )
}