import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppScreen from '../components/AppScreen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';

import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password")
});

function LoginScreen(props) {
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ username, password }) => {
    const result = await authApi.login(username, password);
    console.log(result.data)
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    console.log(result.data)
  };

  return (
    <AppScreen>
        <Text style={styles.title}>TeeParty</Text>
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{ username: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
              <AppTextInput 
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("username")}
              />
              <ErrorMessage error={errors.username} visible={loginFailed}/>
              <AppTextInput 
                placeholder="Password" 
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              />
              <ErrorMessage error={errors.password} visible={loginFailed}/>
              <AppButton 
                title="LOGIN"
                color="green"
                textColor="white"
                onPress={handleSubmit}/>
              </>
            )}
          </Formik>
          
        </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginVertical: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    fontFamily: "MPLUSRounded",
    color: "green",
    alignSelf: "center",
    top: 40
  }
})

export default LoginScreen;