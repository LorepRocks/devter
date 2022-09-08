import styles from "styles/Layout.module.css"
export default function AppLayout({ children }) {
  return (
    <>
      <div className={styles.generalContainer}>
        <main className={styles.principal}>{children}</main>
      </div>
    </>
  )
}
