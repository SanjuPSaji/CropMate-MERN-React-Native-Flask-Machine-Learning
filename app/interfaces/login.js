import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text, ToastAndroid, ActivityIndicator} from "react-native";
import axios from "axios";
import { Button, TextInput } from 'react-native-paper';

const url = require('../url');

const Login = ({ navigation }) => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);


  const handleOnChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };


  const handleError = (err) => {
    setLoading(false);
    ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleSuccess = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
    setTimeout(() => {
      navigation.replace("MainTabs");
    }, 1000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/login`,
        inputValue
      );
      console.log(data);
      const { success, message,user } = data;
      // console.log(user);
      

      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("data");
      console.log(error);
    }
    setInputValue({ email: "", password: "" });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Account</Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={inputValue.email}
        style={{ width: 200 }}
        onChangeText={(text) => handleOnChange("email", text)}
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={inputValue.password}
        mode="outlined"
        style={{ width: 200, marginTop:10  }}
        onChangeText={(text) => handleOnChange("password", text)}
      />

      <Button
        title="Submit"
        mode="contained"
        style={{ width: 200, marginTop:10 }}
        onPress={handleSubmit}>{loading ? <ActivityIndicator color="#fff" /> : "Submit"}</Button>
      <Text 
        style={{  marginTop:10  }}>
        Don't have an account?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Signup")}
        >
          Signup
        </Text>
      </Text>
    </View>
  );
};

Login.navigationOptions = {
  headerShown: false,
};



export default Login;
