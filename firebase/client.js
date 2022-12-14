import { initializeApp } from "firebase/app"
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDLKQ5IP6k45uiWec8hcSlIZb0k6cHaf30",
  authDomain: "devter-3f1a6.firebaseapp.com",
  projectId: "devter-3f1a6",
  storageBucket: "devter-3f1a6.appspot.com",
  messagingSenderId: "788002869748",
  appId: "1:788002869748:web:a33ec1360f78194e13e9a1",
  measurementId: "G-TB0GPMV591",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

const mapUserFromFirebaseAuthToUser = (resp) => {
  const data = resp.user || resp
  const { reloadUserInfo } = data
  const { photoUrl, screenName } = reloadUserInfo

  return {
    uid: data.uid,
    avatar: photoUrl,
    username: screenName,
  }
}

export const onAuthStateChanged = (onChange) => {
  auth.onAuthStateChanged((resp) => {
    console.log("onAuthChange", resp)
    const normalizedUser = resp ? mapUserFromFirebaseAuthToUser(resp) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    img,
    userId,
    userName,
    createAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createAt } = data

  return { ...data, id, createAt: +createAt.toDate() }
}

export const listenLatestDevits = (callback) => {
  const doc = query(
    collection(db, "devits"),
    orderBy("createAt", "desc"),
    limit(20)
  )
  return onSnapshot(doc, ({ docs }) => {
    const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
    callback(newDevits)
  })
}

export const fetchLatestDevits = () => {
  const ref = query(collection(db, "devits"), orderBy("createAt", "desc"))
  return getDocs(ref).then((snapshot) => {
    return snapshot.docs.map(mapDevitFromFirebaseToDevitObject)
  })
}

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(storageRef, file)
}
