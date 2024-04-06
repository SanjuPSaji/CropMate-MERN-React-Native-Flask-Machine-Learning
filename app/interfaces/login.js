import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ScreenA ({navigation}) {

  function onPressHandler() {
    navigation.navigate('Screen_B');
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A</Text>
      <Pressable style={styles.button} onPress={onPressHandler}>
        <Text style={styles.text}>Go To Screen B</Text>
      </Pressable>
    </View>
  )
}

function ScreenB ({navigation}) {
  function onPressHandler() {
    //navigation.navigate('Screen_B');
    navigation.goBack();
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B</Text>
      <Pressable style={styles.button} onPress={onPressHandler}>
        <Text style={styles.text}>Go To Screen A</Text>
      </Pressable>
    </View>
  )
}

export default function Login() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen_A" component={ScreenA}/>
        <Stack.Screen name="Screen_B" component={ScreenB}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10
  },
  button: {
    backgroundColor: '#0f0'
  }
});