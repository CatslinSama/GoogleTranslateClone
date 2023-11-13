import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SeetingScreen from './screens/SeetingScreen';
import SaveScreen from './screens/SaveScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }} />

      <Tab.Screen name='Saved' component={SaveScreen} options={{
        tabBarLabel: 'Save',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }} />

      <Tab.Screen name='Seeting' component={SeetingScreen} options={{
        tabBarLabel: 'Seeting',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={TabNavigator}
            options={{
              headerTitle: 'Cat Translate😼',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}