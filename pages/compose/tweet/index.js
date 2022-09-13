import styles from "styles/ComposeTweet.module.css"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

import { addDevit, uploadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"

import clsx from "clsx"
import { getDownloadURL } from "firebase/storage"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const ComposeTweet = () => {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = (err) => {
        console.log(err)
      }
      const onComplete = () => {
        console.log("onComplete")
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
          setImgURL(downloadURL)
        })
      }
      task.on("stated_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
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

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = e.dataTransfer.files[0]
    const taskClient = uploadImage(file)
    setTask(taskClient)
  }

  return (
    <>
      <Head>
        <title>Create Devit / Devter </title>
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          className={clsx(styles.textarea, {
            [styles.dragBorder]: drag === DRAG_IMAGE_STATES.DRAG_OVER,
          })}
          placeholder="What's up?"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></textarea>
        {imgURL && (
          <section className={styles.imageSection}>
            <button className={styles.btnClose} onClick={() => setImgURL(null)}>
              x
            </button>
            <img className={styles.img} src={imgURL} />
          </section>
        )}
        <div className={styles.btnContainer}>
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
    </>
  )
}

export default ComposeTweet
