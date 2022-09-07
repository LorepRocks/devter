import styles from "styles/ComposeTweet.module.css"
import Button from "components/Button"
const ComposeTweet = () => {
  return (
    <>
      <textarea className={styles.textarea} placeholder="What's up?"></textarea>
      <div className={styles.btnContainer}>
        <Button>Devitear</Button>
      </div>
    </>
  )
}

export default ComposeTweet
