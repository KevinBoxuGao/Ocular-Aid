import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBth4w0A-9HNOZknJy5K54tRiVI9PiQZH8",
  authDomain: "react-boilerplate-6aa48.firebaseapp.com",
  databaseURL: "https://react-boilerplate-6aa48.firebaseio.com",
  projectId: "react-boilerplate-6aa48",
  storageBucket: "react-boilerplate-6aa48.appspot.com",
  messagingSenderId: "760081282037",
  appId: "1:760081282037:web:49d550c7e3a0f363f2e6bc",
  measurementId: "G-SMYYMV9CJ8"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doCreateUserWithEmailAndPassword = (email, password, displayName) => {
    this.auth.createUserWithEmailAndPassword(email, password).then(success => {
      success.updateProfile({
        displayName: displayName
      });
    });
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
