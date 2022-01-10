import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

import * as Actions from '../../../Context/actions/action';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import SignLayout from './Layout/SignLayout';

export default function Sign() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleReturnSignIn = () => {
    if (!navigation.canGoBack()) {
      return null;
    }

    navigation.goBack();
  };

  async function handleFormSubmit(formValues) {
    const name = formValues.username;
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'User created',
        type: 'success',
      });
      setLoading(false);
      dispatch(Actions.get_user_data(name));
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
  }

  return (
    <SignLayout
      onGoBack={handleReturnSignIn}
      loading={loading}
      onSignUp={handleFormSubmit}
    />
  );
}
