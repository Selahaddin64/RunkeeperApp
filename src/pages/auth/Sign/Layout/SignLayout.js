import React from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';

import Input from '../../../../Component/Input';
import Button from '../../../../Component/Button';
import styles from './SignLayout.styles';

const initialFormValues = {
  username: '',
  usersurname: '',
  usermail: '',
  password: '',
  repassword: '',
};

export default function SignLayout({onSignUp, onGoBack, loading}) {
  function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return null;
    }
    onSignUp(formValues);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          source={require('../../../../assets/Logo2.png')}
          style={styles.image}
        />
        <Text style={styles.header}>Runkeeper</Text>
      </View>

      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              value={values.username}
              onChangeText={text =>
                handleChange('username')(text.replace(/ /g, ''))
              }
              placeholder="adınızı giriniz.."
            />
            <Input
              value={values.usersurname}
              onChangeText={text =>
                handleChange('usersurname')(text.replace(/ /g, ''))
              }
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
      <Button text="Giriş Sayfasına Git" theme="secondary" onPress={onGoBack} />
    </SafeAreaView>
  );
}
