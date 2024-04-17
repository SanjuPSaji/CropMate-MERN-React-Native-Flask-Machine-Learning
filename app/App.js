import React, { useState } from 'react';
import  Home  from './interfaces/home.js';
import  Update  from './interfaces/update.js';
import  Login  from './interfaces/login.js';
import  Signup  from './interfaces/signup.js';
import  Forum  from './interfaces/forum.js';
import PostDetails from './interfaces/postDetails.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppState } from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, { backgroundColor: isFocused ? 'rgba(130, 227, 220, 1)' : '#fff' }]}
          >
            <Text style={{ color: isFocused ? '#fff' : '#000' }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const MainTabs = () => {
  const navigation = useNavigation();
  

  const handleLogout = async () => { // Pass navigation as a parameter
    try {
        await AsyncStorage.clear();
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
      
        console.log("AsyncStorage Cleared!");
        console.log("Remaining AsyncStorage Items:");
        items.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        ToastAndroid.showWithGravity("Logging out!", ToastAndroid.SHORT, ToastAndroid.TOP);
        // homestack(); // Call homestack without navigation.navigate('Login')
        navigation.replace('Login'); // Navigate to 'Login'
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};

  const Logout  = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            handleLogout();
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.mainContainer}>

    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Update" component={Update} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen
        name="Logout"
        component={Logout}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default behavior
            Logout(); // Call logout function instead
          },
        }}
      />
    </Tab.Navigator></View>
  );
};

// Main stack navigator for Login and Signup screens
const MainStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }} // Hide header for main tabs
      />
      <Stack.Screen 
        options={{ headerShown: false }}name="Login" component={Login} />
      <Stack.Screen 
        options={{ headerShown: false }}name="Signup" component={Signup} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
     <MainStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
  flex: 1,
  backgroundColor: 'transparent', // Set main container background to transparent
},
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    borderTopWidth: 0,
    zIndex:0,
    bottom: 20,
    height:40,
    left: 5,
    right: 5,
    marginHorizontal:10,
    borderRadius:100,
    backgroundColor: '#fff',
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
