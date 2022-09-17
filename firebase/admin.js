const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-3f1a6.firebaseio.com",
  },
  "db-server4"
)

export const firestore = admin
