import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export class ListItem extends React.Component {

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.user.id)}>
        <View style={{ flex: 1, flexDirection: 'row', padding: 8 }}>
          <Image
            style={{ width: 50, height: 50, marginRight: 8 }}
            source={{ uri: this.props.user.picture }}
          />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text>{this.props.user.first_name}</Text>
            <Text>{this.props.user.last_name}</Text>
          </View>
        </View>
      </TouchableOpacity >
    );
  }

}