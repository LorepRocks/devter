import styles from "styles/Button.module.css"
const Button = ({ children, onClick, disabled }) => {
  return (
    <>
      <button disabled={disabled} className={styles.btn} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button
