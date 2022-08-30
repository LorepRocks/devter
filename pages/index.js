import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
// devit

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          <a href="https://nextjs.org">devter</a>
        </h1>
        <nav>
          <Link href='/timeline'>
            <a>
              timeline
            </a>
          </Link>
        </nav>
      </main>

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 48px;
        }
        nav {
          font-size: 24px;
          text-align: center;
        }
        .another-title {
          color: #333;
          font-size: 24px;
        }
        a {
          color: orange;
          text-decoration: none;
        }
      `}</style>
    </>
  )
}