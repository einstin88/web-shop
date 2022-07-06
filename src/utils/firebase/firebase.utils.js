import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmuRigoty63EmhBG63xL9MoEvZK4JTuy8",
  authDomain: "web-shop-db-68028.firebaseapp.com",
  projectId: "web-shop-db-68028",
  storageBucket: "web-shop-db-68028.appspot.com",
  messagingSenderId: "798665172727",
  appId: "1:798665172727:web:91be9219c0f28a89ba55f2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Point to a authentication provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
// Method 1 to sign-in user: with popup
export function signInWithGooglePopup() {
  return signInWithPopup(auth, googleProvider);
}

// Method 2 to sign-in user: with redirect
export function signInWithGoogleRedirect() {
  return signInWithRedirect(auth, googleProvider);
}

// Point to firestore
export const db = getFirestore();

// Create/Auth user to access Firebase
export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
  // Ensures input is provided
  if (!userAuth) return;

  // Generate a pointer of the user to the db -> collections
  const userDocRef = doc(db, "users", userAuth.uid);

  // Fetch data from db. Check response if the Doc (ie. User) exists on the db.
  const userSnapshot = await getDoc(userDocRef);

  // If user data does not exist, create/set document with the pointer using auth-ed data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Create a db entry for the user
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional,
      });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return userDocRef;
};

export function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  //return console.log(email, password);
  return createUserWithEmailAndPassword(auth, email, password);
};

export function signInAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  //return console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
};

export function signOutUser() {
  return signOut(auth);
}

export function onAuthStateChangedListerner(callback) {
  return onAuthStateChanged(auth, callback);
}
