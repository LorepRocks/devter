
import { initializeApp, getApps } from "firebase/app"
import { getAuth , GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLKQ5IP6k45uiWec8hcSlIZb0k6cHaf30",
    authDomain: "devter-3f1a6.firebaseapp.com",
    projectId: "devter-3f1a6",
    storageBucket: "devter-3f1a6.appspot.com",
    messagingSenderId: "788002869748",
    appId: "1:788002869748:web:a33ec1360f78194e13e9a1",
    measurementId: "G-TB0GPMV591"
}; 

initializeApp(firebaseConfig)
const auth = getAuth()

const mapUserFromFirebaseAuthToUser = (resp) => {
    const data = resp.user || resp
    const { reloadUserInfo } = data
    const { photoUrl, screenName } = reloadUserInfo 

    return {
        avatar: photoUrl,
        username: screenName,
    }
}

export const onAuthStateChanged = (onChange) => {
    auth.onAuthStateChanged(resp => { 
        console.log('onAuthChange',resp)
        const normalizedUser = mapUserFromFirebaseAuthToUser(resp)
        onChange(normalizedUser)
    })
}


export const loginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider()
    return signInWithPopup(auth, githubProvider)
}
