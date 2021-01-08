import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppScreen from '../components/AppScreen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';

import playerApi from "../api/players";
import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().label("Password")
});

function RegisterScreen(props) {
  const authContext = useContext(AuthContext);
  const [playerCreationFailed, setPlayerCreationFailed] = useState(false);

  const handleSubmit = async ({ username, name, password }) => {
    const result = await playerApi.createPlayer(username, name, password)
    console.log(result.data)
    if (!result.ok) return setPlayerCreationFailed(true);
    setPlayerCreationFailed(false);
    const currentUser = result.data.content
    authContext.setCurrentUser(currentUser);
    console.log(result.data)
  };

  return (
    <AppScreen>
        <Text style={styles.title}>TeeParty</Text>
        <View style={styles.loginContainer}>
          <Formik
            initialValues={{ username: '', name: '', password: ''}}
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
              <ErrorMessage error={errors.username} visible={playerCreationFailed}/>
              <AppTextInput 
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("name")}
              />
              <ErrorMessage error={errors.name} visible={playerCreationFailed}/>
              <AppTextInput 
                placeholder="Password" 
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              />
              <ErrorMessage error={errors.password} visible={playerCreationFailed}/>
              <AppButton 
                title="REGISTER"
                color="yellow"
                textColor="green"
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

export default RegisterScreen;