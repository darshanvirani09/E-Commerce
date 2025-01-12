import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {Image} from 'react-native';
import store from './src/store/store';
import HomeScreen from './src/Screen/HomeScreen';
import CartScreen from './src/Screen/CartScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import Header from './src/components/Header';

const Cart = require('./src/assents/shopping-bag.png');
const Home = require('./src/assents/home.png');
const Profile = require('./src/assents/profile-user.png');

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconSource;
              if (route.name === 'Home') {
                iconSource = Home;
              } else if (route.name === 'Cart') {
                iconSource = Cart;
              } else if (route.name === 'Profile') {
                iconSource = Profile;
              }

              return (
                <Image
                  source={iconSource}
                  style={{
                    width: size,
                    height: size,
                    tintColor: color, // Changes color based on active/inactive state
                  }}
                  resizeMode="contain"
                />
              );
            },
            tabBarActiveTintColor: 'tomato', // Active tab color
            tabBarInactiveTintColor: 'gray', // Inactive tab color
            tabBarStyle: {backgroundColor: 'white'}, // Background color of the tab bar
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
