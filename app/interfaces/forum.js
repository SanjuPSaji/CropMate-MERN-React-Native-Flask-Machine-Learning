import React, { useState, useEffect } from "react";
import { View, Text,  ScrollView,ToastAndroid,
  RefreshControl,TouchableOpacity } from "react-native";
import axios from "axios";
import PostTitle from '../components/PostTitle'
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatePost from "../components/CreatePost";
const url = require('../url');

const Update = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userid,setuserid]=useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [username,setusername]=useState("");

   const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(); 
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
 ;

 const fetchData = async () => {
  try {
    const response = await axios.get(`${url}/Postfetch`);
    setPosts(response.data.posts);
    const tok = await AsyncStorage.getItem("tok");
    const getid = await axios.post(
      
      `${url}/`,
      {tok},
      { withCredentials: true }
    );

    const { status, user, id,token } = getid.data;
    console.log(user)
    setuserid(id);
    setusername(user);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/Postfetch`);
        setPosts(response.data.posts);
        const id = await AsyncStorage.getItem("id");
        setuserid(id)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
      try {
        if(!userid){
          fetchData();
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }

    
  }, [userid]);



  return (
    <>
    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}  >
      <PostTitle type="posts" posts={posts} id={userid} navigation={navigation} name={username} 
          onRefresh={onRefresh} 
          onClose={closeModal} />
      
      <View style={{height:70}}></View>
    </ScrollView>
    <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 70,
          right: 30,
          backgroundColor: 'rgba(130, 227, 220, 1)',
          padding: 0,
          borderRadius: 100,
        }}
        onPress={() => {
          openModal()
        }}
      >
        <Text style={{ color: 'white' }}><Icon name="plus" size={55} color="#000" />
</Text>
      </TouchableOpacity>
      <CreatePost
          isVisible={modalVisible}
          onClose={closeModal}
          onRefresh={onRefresh}
          creatorId={userid}
          creatorname={username}
          type="Create Post"
          closeWholeModal={closeModal}
        />
      </>
  );
};

export default Update;
