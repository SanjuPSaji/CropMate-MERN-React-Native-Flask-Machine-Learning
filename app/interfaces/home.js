import React, { useState, useEffect } from "react";
import { View, ToastAndroid, Image, ScrollView ,
  RefreshControl,} from "react-native";
import { Button, Card, Text,Divider, Dialog, Portal, PaperProvider  } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const url = require('../url');

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userid,setuserid]=useState("");
  const [crops, setCrops] = useState([]);
  const [cardHeight, setCardHeight] = useState(0);
  const [code,setCode] = useState("");
  const [visible, setVisible] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshCrops(); 
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
 ;


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
            `${url}/`,
            {},
            { withCredentials: true }
          );
          const { status, user, id } = response.data;
          setUsername(user);

          setuserid(id);

          const responsee = await axios.post(
            `${url}/Cropfetch`,
            { id }
          );
          setCode(responsee.status)
  
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = responsee.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          setCrops(cropNames);

          // await AsyncStorage.setItem("id", id);
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
          }else {

        const response = await axios.post(
          `${url}/Cropfetch`,
          { id }
        );
        setCode(response.status)

        const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
        const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
        setCrops(cropNames);
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
            }else {
  
          const response = await axios.post(
            `${url}/Cropfetch`,
            { id }
          );


          


          setCode(response.status)

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

  

  return (
    <>
    {code === 201 ? (
         <PaperProvider refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <View>
           <Portal>
             <Dialog visible={visible} onDismiss={onRefresh}>
               <Dialog.Title>No Soil details Detected</Dialog.Title>
               <Dialog.Content>
                 <Text variant="bodyMedium">{username}, Soil details are needed for the the best crops to show, please fill the details as such. Thank You!</Text>
               </Dialog.Content>
               <Dialog.Actions>
                 <Button  onPress={() => navigation.navigate('Update')}>Proceed</Button>
               </Dialog.Actions>
             </Dialog>
           </Portal>
         </View>
       </PaperProvider>

      ) : (
      <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ margin: 20 }}>
          <Text>Welcome {username}</Text>

          <View>
            <Card mode="contained">
              <Card.Cover
                style={{
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderRadius: 0,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfZ4N5YPCPYKYrivdbIOgJ1jG78VEy5GhHg&s",
                }}
              />
              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={{
                    fontSize: 40,
                    marginTop: 10,
                    lineHeight: 40,
                  }}
                >
                  {crops[0]}
                </Text>
                <Text variant="bodyMedium">
                  Something detailed about {crops[0]} Something detailed about{" "}
                  {crops[0]}Something detailed about {crops[0]}Something
                  detailed about {crops[0]}Something detailed about {crops[0]}
                </Text>
              </Card.Content>
            </Card>
          </View>

    <Divider style={{marginTop:10}} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "powderblue",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Card
              style={{ flex: 1, marginRight: 10 }}
              onLayout={(event) =>
                setCardHeight(event.nativeEvent.layout.height)
              }
            >
              <Card.Cover
                style={{ height: cardHeight }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfZ4N5YPCPYKYrivdbIOgJ1jG78VEy5GhHg&s",
                }}
              />
            </Card>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 35 }}>{crops[1]}</Text>
              <Text>
                Something detailed about {crops[1]} Something detailed about{" "}
                {crops[1]}Something detailed about {crops[1]}Something detailed
                about {crops[1]}Image
                ImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImage
                Something detailed about {crops[1]}
              </Text>
            </View>
          </View>
    <Divider style={{marginTop:10}} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "powderblue",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Card
              style={{ flex: 1, marginRight: 10 }}
              onLayout={(event) =>
                setCardHeight(event.nativeEvent.layout.height)
              }
            >
              <Card.Cover
                style={{ height: cardHeight }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfZ4N5YPCPYKYrivdbIOgJ1jG78VEy5GhHg&s",
                }}
              />
            </Card>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 35 }}>{crops[2]}</Text>
              <Text>
                Something detailed about {crops[2]} Something detailed about{" "}
                {crops[2]}Something detailed about {crops[2]}Something detailed
                about {crops[2]}Image
                ImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImage
                Something detailed about {crops[2]}
              </Text>
            </View>
          </View>
    <Divider style={{marginTop:10}} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "powderblue",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Card
              style={{ flex: 1, marginRight: 10 }}
              onLayout={(event) =>
                setCardHeight(event.nativeEvent.layout.height)
              }
            >
              <Card.Cover
                style={{ height: cardHeight }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfZ4N5YPCPYKYrivdbIOgJ1jG78VEy5GhHg&s",
                }}
              />
            </Card>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 35 }}>{crops[3]}</Text>
              <Text>
                Something detailed about {crops[3]} Something detailed about{" "}
                {crops[3]}Something detailed about {crops[3]}Something detailed
                about {crops[3]}Image
                ImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImage
                Something detailed about {crops[3]}
              </Text>
            </View>
          </View>
    <Divider style={{marginTop:10}} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "powderblue",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Card
              style={{ flex: 1, marginRight: 10 }}
              onLayout={(event) =>
                setCardHeight(event.nativeEvent.layout.height)
              }
            >
              <Card.Cover
                style={{ height: cardHeight }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfZ4N5YPCPYKYrivdbIOgJ1jG78VEy5GhHg&s",
                }}
              />
            </Card>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 35 }}>{crops[4]}</Text>
              <Text>
                Something detailed about {crops[4]} Something detailed about{" "}
                {crops[4]}Something detailed about {crops[4]}Something detailed
                about {crops[4]}Image
                ImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImageImage
                Something detailed about {crops[4]}
              </Text>
            </View>
          </View>
    <Divider style={{marginTop:10}} />
        </View>
      </ScrollView>
      )}
      {/* <NavBar navigation={navigation} /> */}
    </>
  );
};

export default Home;
