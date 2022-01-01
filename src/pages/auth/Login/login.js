import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

import routes from '../../../Navigation/routes';
import LoginLayout from './Layout/LoginLayout';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // const route = useRoute();
  // const {id} = route.params;

  // console.log(id);

  const handleSignUp = () => navigation.navigate(routes.SIGN);

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
  }

  return (
    <LoginLayout
      onSignIn={handleFormSubmit}
      onSignUp={handleSignUp}
      loading={loading}
    />
  );
}
