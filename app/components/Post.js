import React, {useState, useEffect} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import CommentTitle from '../components/CommentTitle';

const url = require('../url');


const PostDetails = ({ postId, isVisible, onClose,id }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header with close button */}
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
        {/* Content */}
        <View style={styles.content} >
          <CommentTitle posts={post} type="post" id={id}/>
          <CommentTitle posts={comments} type="comment" id={id}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  header: {
    position: 'absolute',
    top: 0, // Adjust elevation by changing top value
    left: 0,
    right: 0,
    backgroundColor: 'white', // Background color of the header
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 5, // Elevation for shadow effect
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginTop: 50,
    justifyContent: 'flex-start'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, // Adjust spacing between close button and heading
  },
});

export default PostDetails;
