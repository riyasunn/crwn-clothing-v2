import { useState } from "react";

import './sign-in-form.styles.scss';

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

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

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields (defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user} = await signInWithGooglePopup();
    // console.log("signIn", response);
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if(password !== confirmPassword) {
    //   alert("passwords do not match");      no need to compaire password & comfirmed password
    //   return;
    // }

    try{

     const response = await signInAuthUserWithEmailAndPassword (email, password);

     console.log(response);
      resetFormFields();

    }catch(error) {
     
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
        <Button buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
       </div>
        
      </form>
    </div>
  );
};

export default SignInForm;
