import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Detail } from './screens/detail/index';
import { UsersList } from './screens/list/index';


const RootStack = createStackNavigator(
  {
    List: { screen: UsersList },
    Detail: { screen: Detail }
  },
  {
    initialRouteName: 'List',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}