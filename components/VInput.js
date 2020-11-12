import React from 'react';
import {requireNativeComponent} from 'react-native';
import PropTypes from 'prop-types';

class VInput extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event) {
    if (!this.props.onChangeMessage) {
      return;
    }
    this.props.onChangeMessage(event.nativeEvent.message);
  }
  render() {
    return <RNTTextInput {...this.props} onChange={this._onChange} />;
  }
}

VInput.propTypes = {
  value: PropTypes.string,
};

var RNTTextInput = requireNativeComponent('VTextInput', VInput);

export default VInput;
