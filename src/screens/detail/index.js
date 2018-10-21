import React from 'react';
import { ActivityIndicator, Button, TextInput, View } from 'react-native';
import firebase from 'react-native-firebase';

export class Detail extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'details' : navigation.state.params.title,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    const { navigation } = this.props;
    this.id = navigation.getParam('id', -1);
    this.user = {};
  }

  componentDidMount() {
    if (this.id !== -1) {
      firebase.firestore().collection('users').doc(this.id).get()
        .then((doc) => {
          if (doc.exists) {
            this.user = { ...doc.data() };
            this.setState({
              isLoading: false,
              user: this.user
            });
            this.props.navigation.setParams({ title: this.user.first_name + ' ' + this.user.last_name });
          } else {
            console.error(`user with id ${this.id} not found`);
          }
        }).catch(err => console.error(err));
    } else {
      console.warn(`id === -1 -- setting new user`);
    }
  }

  onSubmit() {
    if (this.id === -1) {
      firebase.firestore().collection('users').add({ ...this.user })
        .then(() => this.props.navigation.goBack())
        .catch(err => console.error(err));
    } else {
      firebase.firestore().collection('users').doc(this.id).update({ ...this.user })
        .then(() => this.props.navigation.goBack())
        .catch(err => console.error(err));
    }
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
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Prénom"
          onChangeText={(text) => {
            this.user.first_name = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.first_name}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Nom"
          onChangeText={(text) => {
            this.user.last_name = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.last_name}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Description"
          onChangeText={(text) => {
            this.user.description = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.description}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Email"
          onChangeText={(text) => {
            this.user.email = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.email}
        />
        <Button
          onPress={() => this.onSubmit()}
          title="SUBMIT" />
      </View>
    )
  }

}