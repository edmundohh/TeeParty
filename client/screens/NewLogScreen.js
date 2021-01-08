import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppScreen from '../components/AppScreen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';

import scoreLogAPI from "../api/scoreLog";
import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
  score: Yup.number().required().label("Score"),
  courseID: Yup.string().required().label("CourseID")
});

function NewLogScreen(props) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [LogCreationFailed, setLogCreationFailed] = useState(false);

  const handleSubmit = async ({ score, courseID }) => {
    const response = await scoreLogAPI.createLog(new Number(score), new Number(courseID), currentUser.username);
    console.log(response.data);
    return setLogCreationFailed(true);
  };

  return (
    <AppScreen>
        <Text style={styles.title}>New Score Log</Text>
        <View style={styles.newLogContainer}>
          <Formik
            initialValues={{ score: '', courseID: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
              <AppTextInput 
                placeholder="Course ID"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={handleChange("courseID")}
              />
              <ErrorMessage error={errors.courseID} visible={LogCreationFailed}/>
              <AppTextInput 
                placeholder="Score" 
                keyboardType="numeric"
                autoCorrect={false}
                onChangeText={handleChange("score")}
              />
              <ErrorMessage error={errors.score} visible={LogCreationFailed}/>
              <AppButton 
                title="SUBMIT"
                color="green"
                textColor="white"
                onPress={handleSubmit}
              />
              { LogCreationFailed ? <Text style={styles.submit}>Submitted!</Text> : null }
              </>
      
            )}
          </Formik>
          
        </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newLogContainer: {
    padding: 70,
    marginVertical: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "green",
    alignSelf: "center",
    top: 40
  },
  submit: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 15,
    color: "green",
    alignSelf: "center",
  }
})

export default NewLogScreen;