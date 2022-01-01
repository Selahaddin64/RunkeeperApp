import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import routes from '../../../Navigation/routes';
import SignLayout from './Layout/SignLayout';

export default function Sign() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleReturnSignIn = () => {
    if (!navigation.canGoBack()) {
      return null;
    }

    navigation.goBack();
  };
  function sendContent(formValues) {
    const contentObject = {
      username: formValues.username,
      usersername: formValues.usersername,
    };
    console.log(formValues);
    database.ref('users/').push(contentObject);
  }
  async function handleFormSubmit(formValues) {
    sendContent(formValues);
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      navigation.navigate(routes.LOGIN);
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
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
    <SignLayout
      onGoBack={handleReturnSignIn}
      loading={loading}
      onSignUp={handleFormSubmit}
    />
  );
}
