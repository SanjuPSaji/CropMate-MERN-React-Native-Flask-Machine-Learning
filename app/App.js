import React from 'react';
import  Home  from './interfaces/home.js';
import  Update  from './interfaces/update.js';
import  Login  from './interfaces/login.js';
import  Signup  from './interfaces/signup.js';
import  Forum  from './interfaces/forum.js';
import Account from './interfaces/accounts.js'
import PostDetails from './interfaces/postDetails.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Update" component={Update} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
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

export default App;
