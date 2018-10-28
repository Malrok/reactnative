import React from 'react';
import { Modal, View } from 'react-native';

export class AddressAutoCompleteModal extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataSource: ''
  //   };
  // }

  // lookUp(text) {
  //   this.setState({
  //     dataSource: null
  //   });
  //   Geocoder.geocodeAddress(text)
  //     .then(results => {
  //       console.log('results: ', results);
  //       this.setState({
  //         dataSource: results
  //       });
  //     }).catch(error => console.warn(error));
  // }

  onClose() {
    // TODO
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => this.onclose()}>
        <View>
          {/* <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            currentLocation={false}
          /> */}
        </View>
      </Modal>

    );
  }
}