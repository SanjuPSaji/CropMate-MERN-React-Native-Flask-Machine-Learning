import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Button,
  Card,
  Text,
  Divider,
  Dialog,
  Portal,
  PaperProvider,
  Provider 
} from "react-native-paper";

import Modal from "react-native-modal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import getCropDetails from "../helper/CropDetails";

const url = require("../url");

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userid, setuserid] = useState("");
  const [crops, setCrops] = useState([]);
  const [cardHeight, setCardHeight] = useState(0);
  const [code, setCode] = useState("");
  const [visible, setVisible] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshCrops();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const verifyToken = async () => {
        try {
          // const iid = await AsyncStorage.getItem("id");
          // if (!iid) {
          //   navigation.navigate("Login");
          //   return;
          // }
          const response = await axios.post(
            `${url}/mobile`,
            {},
            { withCredentials: true }
          );
          const { status, user, id } = response.data;
          await AsyncStorage.setItem("name", user);
          setUsername(user);

          setuserid(id);

          const responsee = await axios.post(`${url}/Cropfetch`, { id });
          setCode(responsee.status);

          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = responsee.data;

          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];

        // Create an array to store crop details
        const cropDetailsArray = [];

        // Loop through crop names and fetch details for each crop
        for (const cropName of cropNames) {
          const cropDetails = getCropDetails(cropName);
          cropDetailsArray.push(cropDetails);
        }

        // Set the fetched crop details in state
        setCrops(cropDetailsArray);



          await AsyncStorage.setItem("id", id);
          // await AsyncStorage.setItem("username", user);
          if (!status) {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("id");
            navigation.navigate("Login");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      };
      verifyToken();
    }, [navigation])
  );

  const refreshCrops = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (!id) {
        navigation.navigate("Home");
        return;
      } else {
        const response = await axios.post(`${url}/Cropfetch`, { id });
        setCode(response.status);

        const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
        const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];

        // Create an array to store crop details
        const cropDetailsArray = [];

        // Loop through crop names and fetch details for each crop
        for (const cropName of cropNames) {
          const cropDetails = getCropDetails(cropName);
          cropDetailsArray.push(cropDetails);
        }

        // Set the fetched crop details in state
        setCrops(cropDetailsArray);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (!id) {
          navigation.navigate("Home");
          return;
        } else {
          const response = await axios.post(`${url}/Cropfetch`, { id });

          setCode(response.status);

          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          setCrops(cropNames);
        }
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };
    fetchCrops();
  }, [userid]);

  useEffect(() => {
    if (code === 201) {
      setVisible(true);
    }
  }, [code]);


  
  const handleCropPress = (crop) => {
    setSelectedCrop(crop);
    setModalVisible(true);
  };

  return (
    <>
      {code === 201 ? (
        <PaperProvider
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={onRefresh}>
                <Dialog.Title>No Soil details Detected</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    {username}, Soil details are needed for the the best crops
                    to show, please fill the details as such. Thank You!
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => navigation.navigate("Update")}>
                    Proceed
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </PaperProvider>
      ) : (
        <Provider>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {crops.map((crop, index) => (
          <TouchableOpacity key={index} onPress={() => handleCropPress(crop)}>
            {(index === 0 ) ? (<Image
              source={{ uri: crop.image }}
              style={{ width: 360, height: 360, marginHorizontal:'auto', marginLeft:12,marginRight:12, borderRadius:25, marginTop:20}}
            />):(<Image
              source={{ uri: crop.image }}
              style={{ width: 170, height: 350, margin: 10,borderRadius:25, marginLeft:12 }}
            />)}
            
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.4}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Image
              source={{ uri: selectedCrop?.image }}
              style={{ width: 300, height: 300, marginBottom: 10, marginLeft:6,marginRight:6 }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{selectedCrop?.name}</Text>
            <Text>{selectedCrop?.description}</Text>
            <Button mode="contained" style={{ marginTop: 20 }} onPress={() => setModalVisible(false)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </Provider>
      )}
      {/* <NavBar navigation={navigation} /> */}
    </>
  );
};

export default Home;
