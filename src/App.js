import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/home/index';

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}