import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SeetingScreen';
import SavedScreen from './screens/SaveScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font'
import colors from './utils/colors';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import { Provider } from 'react-redux';
import store from './store/store';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="apple-icloud" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}


export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setAppIsLoaded(true);
      }
    };

    prepare();

  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{ flex: 1 }}>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'medium',
                color: '#FCFAF2'
              },
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="main"
                component={TabNavigator}
                options={{
                  headerTitle: 'Translate',
                  headerTitleAlign: 'center',
                }}
              />
            </Stack.Group>


            <Stack.Group
              screenOptions={{
                presentation: 'containeeModal',
                headerStyle: {
                  backgroundColor: 'white'
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: 'medium',
                },
              }}
            >
              <Stack.Screen
                name="languageSelect"
                component={LanguageSelectScreen}
                options={{
                  headerTitle: "Language Select",
                  headerLeft: null, // 隐藏返回按钮
                  headerCenter: () => (
                    <View>
                      <Text style={{ fontFamily: 'medium', color: 'white', fontSize: 18 }}>Language Select</Text>
                    </View>
                  ),
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </View>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}