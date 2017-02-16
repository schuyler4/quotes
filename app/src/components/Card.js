import React from 'react'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native'

function Card(props) {

  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ backgroundColor: '#DCDCDC', width: width - 20,
        marginRight: 10, marginLeft: 10,  margin: 2,borderRadius: 10, padding: 10 }}>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

Card.propTypes = {
  onPress: React.PropTypes.string.func,
  text: React.PropTypes.string.string,
}

export default Card
