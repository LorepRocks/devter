import styles from "styles/Avatar.module.css"
const Avatar = ({ alt, src, text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} title={alt}></img>
      {text && <strong>{text}</strong>}
    </div>
  )
}

export default Avatar
