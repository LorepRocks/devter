import styles from "styles/Devit.module.css"
import Avatar from "components/Avatar"
const Devit = ({ avatar, username, message, id }) => {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.avatarContainer}>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p className={styles.message}>{message}</p>
        </section>
      </article>
    </>
  )
}

export default Devit
