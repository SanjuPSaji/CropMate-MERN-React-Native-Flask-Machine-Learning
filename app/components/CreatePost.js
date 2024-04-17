import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { IconButton } from "react-native-paper";
import axios from "axios";
import Modal from "react-native-modal";
import { Button, TextInput } from "react-native-paper";

const url = require("../url");

const CreatePostS = ({
  isVisible,
  onClose,
  creatorId,
  creatorname,
  type,
  heading,
  content,
  postId,
  hideMenu,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);
  const [inputPost, setinputPost] = useState({
    creatorname: creatorname,
    creatorId: creatorId,
    heading: heading,
    content: content,
  });

  useEffect(() => {
    const putId = async () => {
      try {
        handleOnChange("creatorId", creatorId);
      } catch (error) {
        console.error("Error putting data:", error);
      }
    };
    putId();
  }, [creatorId]);

  useEffect(() => {
    const putName = async () => {
      try {
        handleOnChange("creatorname", creatorname);
      } catch (error) {
        console.error("Error putting data:", error);
      }
    };
    putName();
  }, [creatorname]);

  // useEffect(() => {
  //   const putId = async () => {
  //     try {
  //       handleOnChange('heading', heading)
  //     } catch (error) {
  //       console.error("Error putting data:", error);
  //     }
  //   };
  //   putId();
  // }, [heading]);

  // useEffect(() => {
  //   const putName = async () => {
  //     try {
  //       handleOnChange('creatorname', creatorname)
  //     } catch (error) {
  //       console.error("Error putting data:", error);
  //     }
  //   };
  //   putName();
  // }, [creatorname]);

  // useEffect(() => {
  //   if (!loading) {
  //     setinputPost({
  //       creatorname: inputPost.creatorname,
  //       creatorId: inputPost.creatorId,
  //       heading: "", // Clear the heading field
  //       content: "", // Clear the content field
  //     });
  //     setTimeout(() => {
  //     handleClose();
  //   }, 1000);
  //   }
  // }, [loading]);

  const handleOnChange = (name, value) => {
    setinputPost({ ...inputPost, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(inputPost);
    setLoading(true);
    if (type == "Create Post") {
      try {
        const { data } = await axios.post(`${url}/Post`, inputPost);
        console.log(data);

        if (data.status) {
          setLoading(false);
          handleClose();
          ToastAndroid.showWithGravity(
            data.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        } else {
          setLoading(false);
          return ToastAndroid.showWithGravity(
            data.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
      
      setinputPost({
        creatorname: inputPost.creatorname,
        creatorId: inputPost.creatorId,
        heading: "", 
        content: "", 
      });
    } else if (type == "Edit") {
      
      try {
        const response = await axios.put(`${url}/UpdatePost`, {
          postId: postId,
          heading: inputPost.heading,
          content: inputPost.content
        });

        console.log(response.data.post);

        if (response.data.post) {
          setLoading(false);
          handleClose();
          ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        } else {
          setLoading(false);
          return ToastAndroid.showWithGravity(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
      
      
    }
  };

  const handleClose = () => {
    onClose();
    hideMenu();
    refresh();
  };

  const createClose = () => {
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
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
                onPress={createClose}
              />
              <Text style={styles.heading}>{type}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <TextInput
              label="heading"
              mode="outlined"
              value={inputPost.heading}
              style={{ width: "92%", marginLeft: 15, marginTop: 15 }}
              onChangeText={(text) => handleOnChange("heading", text)}
            />
            <TextInput
              label="content"
              value={inputPost.content}
              multiline={true}
              mode="outlined"
              style={{ width: "92%", marginLeft: 15, marginTop: 10 }}
              onChangeText={(text) => handleOnChange("content", text)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
                marginRight: 15,
              }}
            >
              <Button
                title="Post"
                mode="contained"
                style={{ width: 100 }}
                onPress={handleSubmit}
              >
                {type === "Edit" ? (
                  <>{loading ? <ActivityIndicator color="#fff" /> : "Update"}</>
                ) : (
                  <>{loading ? <ActivityIndicator color="#fff" /> : "Post"}</>
                )}
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

export default CreatePostS;
