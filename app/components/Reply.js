import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,ToastAndroid
} from "react-native";
import { IconButton } from "react-native-paper";
import axios from "axios";
import Modal from "react-native-modal";
import { Button, TextInput } from "react-native-paper";

const url = require("../url");

const Reply = ({ isVisible, onClose, id, name, type,postId,content }) => {

  const [inputComment, setinputComment] = useState({
    postId: postId,
    creatorname: name,
    creatorId: id,
    content: content,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (name, value) => {
    setinputComment({ ...inputComment, [name]: value });
  };

  const handleError = (err) => {
    setLoading(false);
    ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleSuccess = (msg) => {
    
    setLoading(false);
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
    handleClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    if(type=="Edit"){
      try {
        const  response  = await axios.put(
          `${url}/UpdateComment`, {
            postId: inputComment.postId,
            content: inputComment.content 
          });
          console.log(response.message)
        if (response.status=="200") {
          handleSuccess("Comment updated!");
        } else {
          handleError("Internal server error");
        }
    } catch (error) {
      console.log("Error: ",error);
    }
    setinputComment({ postId: "",
      creatorname: name,
      creatorId: id,
      content: "", });

    } else {
        try {
        const { data } = await axios.post(
          `${url}/Comment`,
          inputComment
        );
        if (data.comment) {
          handleSuccess(data.message);
        } else {
          handleError(data.message);
        }
    } catch (error) {
      console.log(error);
    }
    setinputComment({ postId: "",
      creatorname: name,
      creatorId: id,
      content: "", });
    }
    
  };

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
        <ScrollView style={styles.scroll}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <IconButton
                icon="close"
                size={24}
                color="black"
                onPress={handleClose}
              />
              <Text style={styles.heading}>Reply</Text>
            </View>
          </View>
          <View style={styles.content}>

            <TextInput
              label="Comment"
              value={inputComment.content}
              multiline={true}
              mode="outlined"
              style={{ width: "92%", marginLeft: 15, marginTop: 10 }}
              onChangeText={(text) => handleOnChange("content", text)}
            />
<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 15 }}>
            <Button
              title="Reply"
              mode="contained"
              style={{ width: 100 }}
              onPress={handleSubmit}
            >
              {loading ? <ActivityIndicator color="#fff" /> : "Reply"}
            </Button>
            </View>
          </View>
        </ScrollView>
      </View>
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

export default Reply;
