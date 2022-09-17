import styles from "styles/Devit.module.css"
import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"
const Devit = ({ avatar, userName, content, id, createAt, img }) => {
  const timeago = useTimeAgo(createAt)
  const createdAtFormated = useDateTimeFormat(createAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article className={styles.article} onClick={handleArticleClick}>
        <div className={styles.avatarContainer}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <time title={createdAtFormated} className={styles.date}>
                {timeago}
              </time>
            </Link>
          </header>
          <p className={styles.message}>{content}</p>
          {img && <img src={img} className={styles.devitImg} />}
        </section>
      </article>
    </>
  )
}

export default Devit
