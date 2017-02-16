import React from 'react';
import { View, Button, TextInput } from 'react-native';

function Form(props) {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'black', borderWidth: 1,
            borderRadius: 10, margin: 10, padding: 3   }}
          onChangeText={(text) => props.onChange(text) }
          value={ props.text }
        />
      <Button onPress={ props.onSubmit } title="Submit Quote"
          color="#841584" />
      </View>
  );
}

Form.propTypes = {
  text: React.PropTypes.string.string,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func
}

export default Form;
