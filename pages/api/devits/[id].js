import { firestore } from "../../../firebase/admin"
export default (req, res) => {
  const { query } = req
  const { id } = query

  console.log(firestore)

  const db = firestore.database()
  const ref = db.ref("devits")

  console.log(ref)

  res.json({ id })

  /* ref
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", (snapshot) => {
      console.log(snapshot.key)
      res.json(snapshot)
    }) */

  /* firestore.query(
    collection("devits")
    .where("id", "==", id))
    .get()
    .then((doc) => {
      const data = doc.data()
      res.json(data)
    }) */
}
