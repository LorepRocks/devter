import styles from "styles/Devit.module.css"
import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
const Devit = ({ avatar, userName, content, id, createAt }) => {
  const timeago = useTimeAgo(createAt)
  return (
    <>
      <article className={styles.article}>
        <div className={styles.avatarContainer}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date className={styles.date}>{timeago}</date>
          </header>
          <p className={styles.message}>{content}</p>
        </section>
      </article>
    </>
  )
}

export default Devit
