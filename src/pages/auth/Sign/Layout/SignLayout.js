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
        message: 'Passwords do not match',
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
              placeholder="enter your username.."
            />
            <Input
              value={values.usersurname}
              onChangeText={text =>
                handleChange('usersurname')(text.replace(/ /g, ''))
              }
              placeholder="enter your usersurname.."
            />
            <Input
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              placeholder="enter your e-mail.."
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="enter your password.."
              isSecure
            />
            <Input
              value={values.repassword}
              onChangeText={handleChange('repassword')}
              placeholder="re-enter your password.."
              isSecure
            />
            <Button text="Sign in" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Go to Login Page" theme="secondary" onPress={onGoBack} />
    </SafeAreaView>
  );
}
