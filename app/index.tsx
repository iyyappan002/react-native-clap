import { useLoginMutation } from "@/api/mutations";
import { usePost } from "@/context/PostContext";
import { storeStorageItem } from "@/utils/storage";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CheckBox from "react-native-check-box";
// import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import { loginByEmail } from "../store/Auth/authApi";


export default function LoginScreen() {

  const loginMutation = useLoginMutation();
  const { setUserData } = usePost();


  //   const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);

  //   const userData = useSelector(state => state?.auth?.userData);

  // //   const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    console.log(data);
    if (formik.isValid) {
      //   dispatch(loginByEmail(data))
      loginMutation.mutate(data, {
        onSuccess: async (response) => {
          if (response.status == 200) {
            await storeStorageItem('authToken', response?.data?.result?.accessToken)
            await storeStorageItem('userId', `${response?.data?.result?.userId}`)
            setUserData(response?.data?.result)
            router.replace("/posts");
          }
        },
        onError: (response) => {

        }
      })
    }
  };

  //   useEffect(() => {
  //     if(isLoggedIn){
  //       navigation.replace("Drawer")
  //     }
  //   }, [isLoggedIn])


  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "12345",
      rememberMe: false,
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(5, 'Password too short').required('Password is required'),
    }),
  })

  // console.log(formik.isValid,"valid",isLoggedIn);

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/Images/Logo.png")} /> */}
      <Text style={styles.loginText}>Welcome Back!!!</Text>
      <Text style={styles.subText}>Sign in into your account</Text>
      <View style={styles.loginContainer}>

        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          id="email"
          placeholder="suresh.tl@gmail.com"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}

        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          id="password"
          placeholder="Password"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}

        <View style={styles.checkboxContainer}>
          <CheckBox

            isChecked={formik.values.rememberMe}
            checkBoxColor="#2B93E7"
            onClick={() => formik.setFieldValue('rememberMe', !formik.values.rememberMe)}
          />
          <Text>Remember Me</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => formik.handleSubmit()}>
          {loginMutation.isLoading ?
            <ActivityIndicator
              // style={styles.loader} 
              size="large"
              color="white"
              animating={true}
            />
            :
            <Text style={styles.loginButtonText}>Sign In</Text>
          }
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: "15%",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 25,
  },
  subText: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 20,
    color: "#2B93E7",
  },
  loginContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.2) 2px 1px 10px",
    borderColor: "#F6F6F6",
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2B93E7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    gap: 5,
  },
  loginButton: {
    backgroundColor: "#2B93E7",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  }, error: {
    color: 'red',
    marginBottom: 10
  },
});