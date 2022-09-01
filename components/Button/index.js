import styles from "../../styles/Button.module.css"
const Button = ({ children, onClick }) => {
  return (
    <>
      <button className={styles.btn} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button
