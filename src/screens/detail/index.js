import React from 'react';
import { ActivityIndicator, Button, Image, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import AddressAutocomplete from '../../components/address-autocomplete/index';
import translate from '../../services/i18n';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
      this.user = {};
      this.setState({
        isLoading: false,
        user: this.user
      });
    }
  }

  pickImage() {
    this.setState({
      isLoading: true,
      user: this.user
    });
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const filename = response.uri.split('/').pop();
        const ref = firebase.storage().ref().child(`avatars/${filename}`);
        const uploadTask = ref.put(response.uri);

        uploadTask.on('state_changed', (snapshot) => {
          // progress...
        }, (error) => {
          console.error(error);
        }, () => {
          uploadTask.ref.getDownloadURL().then((downloadURL) => {
            this.user.picture = downloadURL;
            this.setState({
              isLoading: false,
              user: this.user
            });
          });
        });

      }
    });
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
        <TouchableWithoutFeedback onPress={() => this.pickImage()}>
          <Image
            style={{ width: 100, height: 100, marginRight: 8 }}
            source={{ uri: this.user.picture }}
          />
        </TouchableWithoutFeedback>
        <TextInput
          style={{ height: 40 }}
          placeholder={translate('detail.first_name')}
          onChangeText={(text) => {
            this.user.first_name = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.first_name}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder={translate('detail.last_name')}
          onChangeText={(text) => {
            this.user.last_name = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.last_name}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder={translate('detail.description')}
          onChangeText={(text) => {
            this.user.description = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.description}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder={translate('detail.email')}
          onChangeText={(text) => {
            this.user.email = text;
            this.setState({ user: this.user });
          }}
          value={this.state.user.email}
        />
        <AddressAutocomplete
          content={this.state.user.address}
        />
        <Button
          onPress={() => this.onSubmit()}
          title={translate('action.submit')} />
      </View>
    )
  }

}