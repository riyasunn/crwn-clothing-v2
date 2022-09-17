import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
 } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCw_VIyLrcjZrpD-GsmXwJRyVKSsqVgbyE",
  authDomain: "crwn-clothing-db-deea7.firebaseapp.com",
  projectId: "crwn-clothing-db-deea7",
  storageBucket: "crwn-clothing-db-deea7.appspot.com",
  messagingSenderId: "295000021838",
  appId: "1:295000021838:web:8f210692fa0640f2831c1f",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     // console.log(title, items);
    //     acc[title.toLowerCase()] = items;
    //     // console.log(acc);
    //     return acc;
    // },{})

    // return categoryMap;
}
/*原来的数据是这样的格式：
 [
  {
    title: 'Hats',
    items: [
      {
        id: 1,
        name: 'Brown Brim',
        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        price: 25,
      },
    }，

想变为以下格式：
[
    {
        'Hats':[ 里面是items的内容如id:1]
    },
]

也就是说将[{key1:val1,key2:val2},{}...] => [{val1:val2},{}...]
*/

export const createUserDocumentFromAuth = async (userAuth, additionInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc (db,'users', userAuth.uid );

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); //this way we know when these users are signing in.

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionInformation,
            });   //pass the data we want to set with
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }
        return userSnapshot;
    
    //if user data doesn't exist

    //create / set the document with the data from userAuth in my collection

    //if user data exists   

    //return userDocRef

    //try to set the document
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
   return await signInWithEmailAndPassword(auth, email,password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};