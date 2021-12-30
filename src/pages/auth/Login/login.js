import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import Input from '../../../Component/Input';
import Button from '../../../Component/Button';
import routes from '../../../Navigation/routes';

import styles from './login.styles';

const initialFormValues = {
  usermail: '',
  password: '',
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Runkeeper</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              onChangeText={handleChange('usermail')}
              value={values.usermail}
              placeholder="e postanızı giriniz.."
            />
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder="şifrenizi giriniz.."
              isSecure
            />
            <Button text="Giriş Yap" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </Formik>
      <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} />
    </SafeAreaView>
  );
}
