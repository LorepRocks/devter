const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

const ramdon = Math.floor(Math.random() * 999999)

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-3f1a6.firebaseio.com",
  },
  `db-server-${ramdon}`
)

export const firebaseAdmin = admin
