import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Geocoder } from '../../services/geocoding';
import translate from '../../services/i18n';
import { AddressAutoCompleteModal } from '../address-autocomplete-modal/index';

class AddressAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      address: ''
    };
  }

  componentDidMount() {
    if (this.props.content && this.props.content.latitude && this.props.content.longitude) {
      Geocoder.geocodePosition(this.props.content.latitude, this.props.content.longitude)
        .then(result => {
          var addressComponent = result.formatted_address;
          this.setState({
            address: addressComponent
          });
        }).catch(error => console.warn(error));
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSelect(data, details) {
    this.setModalVisible(false);
    if (data && details) {
      this.setState({
        address: data.description
      });
      this.props.content.latitude = details.geometry.location.lat;
      this.props.content.longitude = details.geometry.location.lng;
    }
  }

  render() {
    return (
      <View>
        <AddressAutoCompleteModal visible={this.state.modalVisible} onSelect={(data, details) => this.onSelect(data, details)} />
        <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
          <Text>{this.state.address ? this.state.address : translate('autocomplete.hint')}</Text>
        </TouchableWithoutFeedback >
      </View>
    );
  }
}

export default AddressAutoComplete;