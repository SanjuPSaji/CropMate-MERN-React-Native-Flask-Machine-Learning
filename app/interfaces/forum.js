import React, { useState, useEffect } from "react";
import { View, Text,  ScrollView,ToastAndroid,
  RefreshControl,TouchableOpacity } from "react-native";
import axios from "axios";
import PostTitle from '../components/PostTitle'
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = require('../url');

const Update = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userid,setuserid]=useState("");
  

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
    const getid = await axios.post(
      `${url}/`,
      {},
      { withCredentials: true }
    );
    const { status, user, id } = getid.data;
    setuserid(id);
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
    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
      <PostTitle type="posts" posts={posts} id={userid} navigation={navigation} />
      
    </ScrollView>
    <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'green',
          padding: 0,
          borderRadius: 100,
        }}
        onPress={() => {
          // Handle button press action
        }}
      >
        <Text style={{ color: 'white' }}><Icon name="plus" size={39} color="#000" />
</Text>
      </TouchableOpacity>
      </>
  );
};

export default Update;
