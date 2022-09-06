import "../styles/globals.css"
import styles from "styles/Layout.module.css"

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.generalContainer}>
      <main className={styles.principal}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
