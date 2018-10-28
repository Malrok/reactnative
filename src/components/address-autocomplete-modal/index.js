import React from 'react';
import { Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export class AddressAutoCompleteModal extends React.Component {

  onClose() {
    this.props.onSelect();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => this.onClose()}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          fetchDetails={true}
          onPress={(data, details = null) => this.props.onSelect(data, details)}
          query={{
            key: 'AIzaSyCJhO9SPTit2418hkttbpn_KFxL-G3yyPM',
            language: 'en', // language of the results
          }}
          currentLocation={false}
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        />
      </Modal>

    );
  }

}
