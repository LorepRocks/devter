import styles from "styles/ComposeTweet.module.css"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"

import { addDevit } from "../../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const ComposeTweet = () => {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          className={styles.textarea}
          placeholder="What's up?"
        ></textarea>
        <div className={styles.btnContainer}>
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
    </>
  )
}

export default ComposeTweet
