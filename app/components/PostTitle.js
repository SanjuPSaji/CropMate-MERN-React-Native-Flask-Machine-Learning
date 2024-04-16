import React, {useState, useEffect } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Image,ToastAndroid } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/EvilIcons";
import {decode} from 'html-entities';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import PostDetails from "../interfaces/postDetails";
import CreatePost from "../components/CreatePost";
import deleteData from '../helper/deleteData';

const LeftContent = () => (
  <View>
    <Icons name="user" size={39} color="#000" />
  </View>
);



const MyComponent = ({ posts, id,name,onRefresh,onClose }) => {
  const [menuVisibility, setMenuVisibility] = useState(Array(posts.length).fill(false));
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, seteditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectHeadingEdit, setselectHeadingEdit] = useState(null);
  const [selectContentEdit, setselectContentEdit] = useState(null)
  const [selectPostId, setselectPostId] = useState(null)

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalVisible(false);
  };

  const openEditModal = (post,postid) => {
    setselectHeadingEdit(post.heading);
    setselectContentEdit(post.content);
    setselectPostId(postid);
  };

  const closeEditModal = () => {
    setselectHeadingEdit(null);
    setselectContentEdit(null);
    setselectPostId(null);
    seteditModalVisible(false);
  };


  const toggleMenu = (index) => {
    const updatedVisibility = [...menuVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setMenuVisibility(updatedVisibility);
  };

  const hideMenu = () => {
    console.log(menuVisibility)
    setMenuVisibility(posts.map(() => false));
  };

  const deletepost= async (postId) => {
    try {
      const response = await deleteData(postId, "/deletePostAndComments");
      console.log(response); 
      ToastAndroid.showWithGravity(response.message, ToastAndroid.SHORT, ToastAndroid.TOP);
      hideMenu();
      onClose();
      refreshondelete();
    } catch (error) {
      console.error("Error deleting post:", error);
      ToastAndroid.showWithGravity("Failed to delete post", ToastAndroid.SHORT, ToastAndroid.TOP);
      hideMenu();
    }
  };

  const refreshondelete = () => {
    onRefresh();
  };

  useEffect(() => {
    if (selectedPost) {
      setModalVisible(true);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectHeadingEdit) {
      seteditModalVisible(true);
    }
  }, [selectHeadingEdit]);


  

  const onPress = () => {};
  return (
    <View>
      {posts.map((post) => (
        <Card
          style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 5 }}
          key={post._id}
        >
          {post.creatorId === id && (
            <View style={{ height: '100',alignSelf: 'flex-end',marginTop:10, marginRight:10 }}>
            <Menu
                visible={menuVisibility[post._id]}
                anchor={<Text onPress={() => toggleMenu(post._id)}><Icon name="dots-three-vertical" size={15} color="#000" /></Text>}
                onRequestClose={() => hideMenu(post._id)}
              >
              <MenuItem onPress={() => openEditModal(post,post._id)}>Edit</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => deletepost(post._id)}>Delete</MenuItem>
            </Menu>
          </View>
          )}
          <TouchableOpacity onPress={() => openModal(post._id)} >

          {(post.creatorId === id) ? (
            <><Card.Title style={{marginLeft:45, marginRight:100,marginTop:-20}}
            title={`${post.creatorname} ${decode('&bull;')} ${moment(post.createdAt
            ).fromNow()}`}
          />
          <Card.Title style={{marginTop:-68,marginRight:-10}}
          left={LeftContent}
        /></>
          ) : (
            <>
          <Card.Title style={{marginLeft:45, marginRight:100,marginTop:0}}
            title={`${post.creatorname} ${decode('&bull;')} ${moment(post.createdAt
            ).fromNow()}`}
          />
          <Card.Title style={{marginTop:-68,marginRight:-10}}
          left={LeftContent}/>
          </>
        )}
        
            <Card.Content style={{ marginTop: -10, marginBottom: 10 }}>
              <Text style={{ fontSize: 25,marginRight:10 }} variant="titleLarge">
                {post.heading}
              </Text>
              <Text style={{}} variant="bodyMedium">
                {post.content}
              </Text>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      ))}
      {selectedPost != null  && (
        <PostDetails
          isVisible={modalVisible}
          onClose={closeModal}
          onRefreshs={onRefresh}
          postId={selectedPost}
          id={id}
          name={name}
        />
      )}
      {selectHeadingEdit != null  && (
        <CreatePost
          isVisible={editModalVisible}
          onClose={closeEditModal}
          creatorId={id}
          refresh={refreshondelete}
          hideMenu={hideMenu}
          postId={selectPostId}
          heading={selectHeadingEdit}
          content={selectContentEdit}
          creatorname={name}
          type="Edit"
        />
      )}
    </View>
  );
};

export default MyComponent;
