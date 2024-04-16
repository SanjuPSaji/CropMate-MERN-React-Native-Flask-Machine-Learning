import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { IconButton, Card } from "react-native-paper";
import axios from "axios";
import CommentTitle from "../components/CommentTitle";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import Reply from '../components/Reply'

const url = require("../url");

const LeftContent = () => (
  <View>
    <Icon name="reply" size={25} color="#000" />
  </View>
);

const PostDetails = ({ postId, isVisible, onClose, id, name,onRefreshs }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true);
    
  };

  const closeModal = () => {
    setModalVisible(false);
    handleClose();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Make a POST request to fetch the post details
        const presponse = await axios.get(`${url}/PostId?postId=${postId}`);
        const pdata = await presponse.data;

        // Check if the presponse contains post data
        if (presponse.status) {
          setPost(pdata); // Update the state with the received post data
        } else {
          console.error("Error fetching post:", data.message);
        }

        const response = await axios.get(
          `${url}/Commentfetch?postId=${postId}`
        );
        const data = await response.data;

        if (response.status) {
          setComments(data.comments); // Update the state with the received comments data
        } else {
          console.error("Error fetching comments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost(); // Call the fetchPost function when the component mounts
  }, [postId]);



  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        {/* Header with close button */}

        {/* Content */}
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <IconButton
                icon="close"
                size={24}
                color="black"
                onPress={handleClose}
              />
              <Text style={styles.heading}>Details</Text>
            </View>
          </View>
          <View style={styles.content}>
            <CommentTitle posts={post} type="post" id={id} refresh={onRefreshs} onClose={onClose}  />

            <TouchableOpacity  onPress={openModal}>
              <Card
                mode="outlined"
                style={{
                  backgroundColor: "whitesmoke",
                  width: "95%",
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                <Card.Title
                  title="Reply"
                  style={{ marginLeft: 40, borderRadius: 100, marginTop: 5 }}
                />

                <Card.Title
                  style={{
                    marginTop: -65,
                    marginBottom: -10,
                    marginRight: -10,
                    backgroundColor: "transparent",
                  }}
                  left={LeftContent}
                />
              </Card>
              </TouchableOpacity>
              <CommentTitle posts={comments} type="comment" id={id}  refresh={onRefreshs} onClose={onClose}  />
            
          </View>
          
        </ScrollView>
      </View>
      <Reply
          isVisible={modalVisible}
          onClose={closeModal}
          postId={postId}
          id={id}
          name={name}
          type="comment"
        />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: -20,
    justifyContent: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  scroll: {
    zIndex: 2,
  },
  header: {
    position: "absolute",
    top: 0, // Adjust elevation by changing top value
    left: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: "white", // Background color of the header
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 5, // Elevation for shadow effect
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginTop: 50,
    zIndex: -1,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10, // Adjust spacing between close button and heading
  },
});

export default PostDetails;
