import React from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';


export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [] };
    this.ref = firebase.firestore().collection('users').limit(10);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach(doc => {
      data.push({
        id: doc.id,
        first_name: doc.data().first_name,
        last_name: doc.data().last_name
      });
    });
    this.setState({
      isLoading: false,
      dataSource: data
    });
  }

  onPressButton(user) {
    Alert.alert('You tapped ' + user.first_name);
  }

  renderItem(user) {
    return (
      <TouchableOpacity onPress={() => this.onPressButton(user)}>
        <View>
          <Text>{user.first_name}, {user.last_name}</Text>
        </View>
      </TouchableOpacity >
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(user) => user.id}
        />
      </View>
    );
  }
}
