import firebase from 'firebase/app'
import "firebase/auth" ;
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyAQITS8EzppEJ8l9VvWbJ3MmI7JXM05v2U",
    authDomain: "monthlysim.firebaseapp.com",
    projectId: "monthlysim",
    storageBucket: "monthlysim.appspot.com",
    messagingSenderId: "212900247897",
    appId: "1:212900247897:web:64e734636e0844668fb448",
    measurementId: "G-KX1ZXTE7P8"
}


firebase.initializeApp(firebaseConfig)


const apiKey = firebaseConfig.apiKey
const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const realtime = firebase.database()
export{auth, firestore, storage, realtime, apiKey}