import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import routes from '../../../Navigation/routes';
import Input from '../../../Component/Input';
import Button from '../../../Component/Button';
import styles from './sign.styles';

const initialFormValues = {
  username: '',
  usersurname: '',
  usermail: '',
  password: '',
  repassword: '',
};

export default function Sign() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => navigation.goBack();

  async function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return null;
    }
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Runkeeper</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              value={values.username}
              onChangeText={handleChange('username')}
              placeholder="adınızı giriniz.."
            />
            <Input
              value={values.usersurname}
              onChangeText={handleChange('usersurname')}
              placeholder="soyadınızı giriniz.."
            />
            <Input
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              placeholder="e postanızı giriniz.."
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="şifrenizi giriniz.."
              isSecure
            />
            <Input
              value={values.repassword}
              onChangeText={handleChange('repassword')}
              placeholder="şifrenizi tekrar giriniz.."
              isSecure
            />
            <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button
        text="Giriş Sayfasına Git"
        theme="secondary"
        onPress={handleLogin}
      />
    </SafeAreaView>
  );
}
