import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
//   signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    async function getResult() {
      const response = await getRedirectResult(auth);
      // console.log(response);

      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    getResult();
  }, []);

//   const logGoogleUser = async () => {
//     const { user } = await signInWithGooglePopup();
//     // console.log("signIn" + user);
//     const userDocRef = await createUserDocumentFromAuth(user);
//   };
    

  return (
    <div>
      <h1> Sign In Page</h1>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
