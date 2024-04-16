import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Image,ToastAndroid } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/EvilIcons";
import { decode } from "html-entities";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import CreatePost from "../components/CreatePost";
import Reply from '../components/Reply'
import deleteData from "../helper/deleteData";

const LeftContent = () => (
  <View>
    <Icons name="user" size={39} color="#000" />
  </View>
);

const CommentTitle = ({ posts, type, id, refresh ,onClose }) => {
  const [menuVisibility, setMenuVisibility] = useState([]);
  const [postmenu, setPostMenu] = useState(false);
  const [editModalVisible, seteditModalVisible] = useState(false);
  const [selectHeadingEdit, setselectHeadingEdit] = useState(null);
  const [selectContentEdit, setselectContentEdit] = useState(null)
  const [selectPostId, setselectPostId] = useState(null)
  const [selectcommentId, setselectcommentId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = (post) => {
    setselectContentEdit(post.content)
    setselectcommentId(post._id)
    setModalVisible(true);
  };

  const closeModal = () => {
    setselectContentEdit(null)
    setselectcommentId(null)
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

  const togglepostmenu = () => {
    setPostMenu(true);
  };

  const hidepostmenu = () => {
    setPostMenu(false);
  };

  const toggleMenu = (index) => {
    const updatedVisibility = [...menuVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setMenuVisibility(updatedVisibility);
  };

  const hideMenu = () => {
    setMenuVisibility(posts.map(() => false));
  };

  const deletepost= async (postId,type) => {
    if(type=="post"){
    try {
      const response = await deleteData(postId, "/DeletePostAndComments");
      console.log(response); 
      ToastAndroid.showWithGravity(response.message, ToastAndroid.SHORT, ToastAndroid.TOP);
      hidepostmenu();
      refresh();
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
      ToastAndroid.showWithGravity("Failed to delete post", ToastAndroid.SHORT, ToastAndroid.TOP);
      hideMenu();
    }
    }else {
      try {
        const response = await deleteData(postId, "/DeleteComment","comment");
        console.log(response); 
        ToastAndroid.showWithGravity(response.message, ToastAndroid.SHORT, ToastAndroid.TOP);
        hideMenu();
        refresh();
        onClose();
      } catch (error) {
        console.error("Error deleting post:", error);
        ToastAndroid.showWithGravity("Failed to delete post", ToastAndroid.SHORT, ToastAndroid.TOP);
        hideMenu();
      }
    }
  };

  useEffect(() => {
    if (selectHeadingEdit) {
      seteditModalVisible(true);
    }
  }, [selectHeadingEdit]);

  useEffect(() => {
    if (selectContentEdit) {
      seteditModalVisible(true);
    }
  }, [selectContentEdit]);

  const onPress = () => {};
  return (
    <View>
      {type === "post" && !Array.isArray(posts) ? (
        <Card
          style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 5 }}
          key={posts._id}
        >
          {posts.creatorId === id && (
            <View
              style={{
                height: "100",
                alignSelf: "flex-end",
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <Menu
                visible={postmenu}
                anchor={
                  <Text onPress={() => togglepostmenu()}>
                    <Icon name="dots-three-vertical" size={15} color="#000" />
                  </Text>
                }
                onRequestClose={() => hidepostmenu()}
              >
                <MenuItem onPress={() => openEditModal(posts,posts._id)}>Edit</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => deletepost(posts._id,type)}>Delete</MenuItem>
              </Menu>
            </View>
          )}

          {posts.creatorId === id ? (
            <>
              <Card.Title
                style={{ marginLeft: 45, marginRight: 100, marginTop: -20 }}
                title={`${posts.creatorname} ${decode("&bull;")} ${moment(
                  posts.createdAt
                ).fromNow()}`}
              />
              <Card.Title
                style={{ marginTop: -68, marginRight: -10 }}
                left={LeftContent}
              />
            </>
          ) : (
            <>
              <Card.Title
                style={{ marginLeft: 45, marginRight: 100, marginTop: 0 }}
                title={`${posts.creatorname} ${decode("&bull;")} ${moment(
                  posts.createdAt
                ).fromNow()}`}
              />
              <Card.Title
                style={{ marginTop: -68, marginRight: -10 }}
                left={LeftContent}
              />
            </>
          )}
          <Card.Content style={{ marginTop: -10, marginBottom: 10 }}>
            <Text
              style={{ fontSize: 25, marginRight: 10 }}
              variant="titleLarge"
            >
              {posts.heading}
            </Text>
            <Text style={{}} variant="bodyMedium">
              {posts.content}
            </Text>
          </Card.Content>
        </Card>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <Card
            style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 5 }}
            key={post._id}
          >
            {post.creatorId === id && (
              <View
                style={{
                  height: "100",
                  alignSelf: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Menu
                  visible={menuVisibility[post._id]}
                  anchor={
                    <Text onPress={() => toggleMenu(post._id)}>
                      <Icon name="dots-three-vertical" size={15} color="#000" />
                    </Text>
                  }
                  onRequestClose={() => hideMenu(post._id)}
                >
                  <MenuItem  onPress={() => openModal(post)}>Edit</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={() => deletepost(post._id,type)}>Delete</MenuItem>
                </Menu>
              </View>
            )}

            {post.creatorId === id ? (
              <>
                <Card.Title
                  style={{ marginLeft: 45, marginRight: 100, marginTop: -20 }}
                  title={`${post.creatorname} ${decode("&bull;")} ${moment(
                    post.createdAt
                  ).fromNow()}`}
                />
                <Card.Title
                  style={{ marginTop: -68, marginRight: -10 }}
                  left={LeftContent}
                />
              </>
            ) : (
              <>
                <Card.Title
                  style={{ marginLeft: 45, marginRight: 100, marginTop: 0 }}
                  title={`${post.creatorname} ${decode("&bull;")} ${moment(
                    post.createdAt
                  ).fromNow()}`}
                />
                <Card.Title
                  style={{ marginTop: -68, marginRight: -10 }}
                  left={LeftContent}
                />
              </>
            )}

            {/* <Card.Title style={{ marginLeft: 45, marginRight: 100, marginTop: -20 }}
              title={`${post.creatorname} ${decode('&bull;')} ${moment(post.createdAt).fromNow()}`}
            />
            <Card.Title style={{ marginTop: -68, marginRight: -10 }} left={LeftContent} /> */}

            <Card.Content style={{ marginTop: -10, marginBottom: 10 }}>
              <Text style={{}} variant="bodyMedium">
                {post.content}
              </Text>
            </Card.Content>
          </Card>
        ))
      )}
      {selectHeadingEdit != null  && (
      <CreatePost
          isVisible={editModalVisible}
          onClose={closeEditModal}
          hideMenu={hidepostmenu}
          refresh={refresh}
          creatorId={id}
          postId={selectPostId}
          heading={selectHeadingEdit}
          content={selectContentEdit}
          type="Edit"
        />
      )}
      {selectContentEdit != null  && (
      <Reply
          isVisible={modalVisible}
          onClose={closeModal}
          hideMenu={hideMenu}
          refresh={refresh}
          content={selectContentEdit}
          postId={selectcommentId}
          type="Edit"
        />
      )}
    </View>
  );
};

export default CommentTitle;
