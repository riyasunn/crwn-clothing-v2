import { useState } from "react";

import './sign-in-form.styles.scss';

import FormInput from "../form-input/form-input.component";

import Button, { BUTTON_TYPE_CLASSES }from "../button/button.component";

// import {UserContext} from '../../context/user.context';

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  email: "",
  password: "",      //delete displayname & confirmed password
};
// change key/value
// defaultFormFields['displayName'] = value;
// defaultFormFields.displayName = value;

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;   //delete displayname & confirmed password
  // console.log(formFields);

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields (defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // console.log("signIn", response);
    // await createUserDocumentFromAuth(user);   move to user.context file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if(password !== confirmPassword) {
    //   alert("passwords do not match");      no need to compaire password & comfirmed password
    //   return;
    // }

    try{

      await signInAuthUserWithEmailAndPassword (email, password);

    //  console.log(response);

    // setCurrentUser(user); //run setCurrentUser when the await user come back; deleted becuz setuser in usercontext file
      resetFormFields();

    }catch(error) {
     switch (error.code) {
      case 'auth/wrong-password':
        alert('incorrect password for email');
        break;
      case 'auth/user-not-found':
        alert('no user associated with this email');
        break;
      default:
        console.log(error);
     }
      // if (error.code === "auth/wrong-password") {
      //   alert("incorrect password for email");
      // }else if(error.code === "auth/user-not-found") {
      //   alert("no user associated with this email")
      // }
     
    }

  };

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    console.log(type, name, value)
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={ handleSubmit }>
        

        <FormInput
          label="Email"
          type="email"
          required
          onChange={ handleChange }
          name='email'
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={ handleChange }
          name='password'
          value={ password }
        />

       <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
       </div>
        
      </form>
    </div>
  );
};

export default SignInForm;
