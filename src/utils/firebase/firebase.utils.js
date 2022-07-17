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
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

/*============================================================
Section: Handle calls for user obj's -> auth's & firestore(db) 
 ============================================================*/

// Create/Auth user to access Firebase
export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
  // Ensures input is provided
  if (!userAuth) return;

  // Generate a pointer of the user to the db -> collections
  // https://firebase.google.com/docs/reference/js/firestore_.md#doc
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

  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function onAuthStateChangedListerner(callback) {
  return onAuthStateChanged(auth, callback);
}

/*============================================================
Section: Handle calls for shop/products data 
 ============================================================*/
// Function to add data to firestore collection
export async function addCollectionsAndDocuments(dataToAdd) {
  // API function to write data in a batch
  const batch = writeBatch(db);
  // Pointer to tell Firestore where to write the data
  const collectionRef = collection(db, "categories");

  // Shop data is a list of multiple 'category' objects
  dataToAdd.forEach((element) => {
    const docRef = doc(collectionRef, element.title.toLowerCase());
    // Adds data of each category to the batch
    batch.set(docRef, element);
  });

  try {
    // Writes on db
    await batch.commit();
    console.log("Done writing data to firestore");
  } catch (error) {
    console.log("Error writing to firestore:", error);
  }
}

// Get multiple docs with one request
export async function getCategoriesAndDocuments() {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}
