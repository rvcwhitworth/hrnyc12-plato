import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

class AddAttendee extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleFirstNameChange (e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastNameChange (e) {
    this.setState({
      lastName: e.target.value
    });
  }

  handlePhoneNumberChange (e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.addNewAttendee(this.state);
  }

  render () {
    let style = {
      raisedButton: {
        margin: 1
      },
      textField: {
        marginLeft: 20
      }, 
    };

    return (
      <form onSubmit={this.handleSubmit} className="addAttendee">

        <h4>Attendee Information</h4>
        <TextField value={this.state.firstName} onChange={this.handleFirstNameChange} required={true} floatingLabelText="First name" style={style.textField} underlineShow={false} />
        <Divider />
        <TextField value={this.state.lastName} onChange={this.handleLastNameChange} required={true} floatingLabelText="Last name" style={style.textField} underlineShow={false} />
        <Divider />
        <TextField value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required={true} floatingLabelText="Phone number" style={style.textField} underlineShow={false} />
        <Divider />
        <RaisedButton style={style.raisedButton} label="Add Attendee" onClick={this.handleSubmit} secondary={true} />
        
      </form>
    )
  }
}

export default AddAttendee;