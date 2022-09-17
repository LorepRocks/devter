import styles from "styles/Devit.module.css"
import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
const Devit = ({ avatar, userName, content, id, createAt, img }) => {
  const timeago = useTimeAgo(createAt)
  const createdAtFormated = useDateTimeFormat(createAt)
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
            <time title={createdAtFormated} className={styles.date}>
              {timeago}
            </time>
          </header>
          <p className={styles.message}>{content}</p>
          {img && <img src={img} className={styles.devitImg} />}
        </section>
      </article>
    </>
  )
}

export default Devit
