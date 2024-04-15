import React, { useState } from "react";
import {
  View,
  Text,
  ToastAndroid,
  ActivityIndicator 
} from "react-native";
import axios from "axios";
import { Button, TextInput } from 'react-native-paper';

const url = require('../url');

const Signup = ({ navigation }) => {
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    password: "",
  });
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
        `${url}/signup`,
        inputValue
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signup Account</Text>
      <TextInput
        label="Full Name"
        mode="outlined"
        value={inputValue.name}
        style={{ width: 200 }}
        onChangeText={(text) => handleOnChange("name", text)}
      />
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
        Already have an account?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};



export default Signup;