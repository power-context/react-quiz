import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCxKu0C6JpPx8tDFf_YDieuEfMwChf3r80",
    authDomain: "react-quiz-62ba2.firebaseapp.com",
    databaseURL: "https://react-quiz-62ba2.firebaseio.com",
    projectId: "react-quiz-62ba2",
    storageBucket: "react-quiz-62ba2.appspot.com",
    messagingSenderId: "160876965924",
    appId: "1:160876965924:web:00e3b4a562a0a796de68b1"
  }

  const fire = firebase.initializeApp(firebaseConfig)

  export default fire