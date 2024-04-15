import React from 'react';
import Login from '../interfaces/login.js';
import Signup from '../interfaces/signup.js';
import { Button, View, ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const handleLogout = async (navigation) => { // Pass navigation as a parameter
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



const Accounts = ({ navigation }) => {
    return (
        <>
        <View>
            <Button title='Logout' onPress={() => handleLogout(navigation)}>Logout</Button>
        </View>
        </>);
}

export default Accounts;
