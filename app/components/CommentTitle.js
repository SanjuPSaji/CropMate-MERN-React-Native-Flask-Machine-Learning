import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/EvilIcons";
import { decode } from "html-entities";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const LeftContent = () => (
  <View>
    <Icons name="user" size={39} color="#000" />
  </View>
);

const CommentTitle = ({ posts, type, id }) => {
  const [menuVisibility, setMenuVisibility] = useState([]);
  const [postmenu, setPostMenu] = useState(false);

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

  console.log(posts);

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
                <MenuItem onPress={hidepostmenu}>Edit</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hidepostmenu}>Delete</MenuItem>
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
                  <MenuItem onPress={hideMenu}>Edit</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={onPress}>Delete</MenuItem>
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
    </View>
  );
};

export default CommentTitle;
