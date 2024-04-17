import React, { useState, useEffect } from "react";
import { View, Text,  ScrollView,ToastAndroid } from "react-native";
import axios from "axios";
import { Button, TextInput,ActivityIndicator, Banner  } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = require('../url');

const Update = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userid,setuserid]=useState("");
  const [formData, setFormData] = useState({
    id: "",
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const iid = await AsyncStorage.getItem("id");
        handleChange('id', iid)

        setuserid(iid)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = await AsyncStorage.getItem("id");
      console.log(formData)

      const response = await axios.post(`${url}/datatoml`, formData);
      // setResult(response.data.result);
      console.log(response.data.Crop1);

      const detailsdata = await axios.post(`${url}/data`, formData);
      console.log(detailsdata.data.message);
      setLoading(false);
      ToastAndroid.showWithGravity(detailsdata.data.message, ToastAndroid.SHORT, ToastAndroid.TOP);

    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
    <ScrollView>
      <View style={{ margin: 20 }}>
        <TextInput
        label="Nitrogen"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0 }}
          keyboardType="numeric"
          placeholder="Enter Nitrogen"
          value={formData.Nitrogen}
          onChangeText={(value) => handleChange('Nitrogen', value)}
        />
        <TextInput
        label="Phosphorus"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20 }}
          keyboardType="numeric"
          placeholder="Enter Phosphorus"
          value={formData.Phosphorus}
          onChangeText={(value) => handleChange('Phosphorus', value)}
        />
        <TextInput
        label="Potassium"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20  }}
          keyboardType="numeric"
          placeholder="Enter Potassium"
          value={formData.Potassium}
          onChangeText={(value) => handleChange('Potassium', value)}
        />
        <TextInput
        label="Temperature"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20  }}
          keyboardType="numeric"
          placeholder="Enter Temperature"
          value={formData.Temperature}
          onChangeText={(value) => handleChange('Temperature', value)}
        />
        <TextInput
        label="Humidity"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20  }}
          keyboardType="numeric"
          placeholder="Enter Humidity"
          value={formData.Humidity}
          onChangeText={(value) => handleChange('Humidity', value)}
        />
        <TextInput
        label="pH"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20  }}
          keyboardType="numeric"
          placeholder="Enter pH"
          value={formData.pH}
          onChangeText={(value) => handleChange('pH', value)}
        />
        <TextInput
        label="Rainfall"
        mode="outlined"
          style={{ height: 40, borderColor: 'gray', borderWidth: 0, marginTop:20  }}
          keyboardType="numeric"
          placeholder="Enter Rainfall"
          value={formData.Rainfall}
          onChangeText={(value) => handleChange('Rainfall', value)}
        />
        <Button
        title="Submit"
        mode="contained"
        style={{ width: 200, marginTop:20, marginHorizontal:70 }}
        onPress={handleSubmit}>{loading ? <ActivityIndicator color="#fff" /> : "Submit"}</Button>
      </View>
    </ScrollView>
      {/* <NavBar navigation={navigation} /> */}
      </>
  );
};

export default Update;
