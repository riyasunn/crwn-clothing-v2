import { useState } from "react";

import './sign-up-form.styles.scss';

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { useDispatch } from "react-redux";
import {signUpStart} from '../../store/user/user.action';
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
// change key/value
// defaultFormFields['displayName'] = value;
// defaultFormFields.displayName = value;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // const {setCurrentUser} = useContext(UserContext);
   // console.log(formFields);

  const resetFormFields = () => {
    setFormFields (defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try{
      dispatch(signUpStart(email, password, displayName));
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // // console.log(response);
      // // setCurrentUser(user);

      // await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();

    }catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('cannot create user, email already in use');
      }else{
      console.log('user creation encoutered an error', error);
      }
    }

  };

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    console.log(type, name, value)
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={ handleChange }
          name='displayName'
          value={ displayName }
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={ handleChange }
          name='confirmPassword'
          value={ confirmPassword }
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
