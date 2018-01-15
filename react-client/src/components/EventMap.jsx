import React from 'react';
import axios from 'axios';
import AttendeeMap from './AttendeeMap.jsx';
import AddAttendee from './AddAttendee.jsx';
import Paper from 'material-ui/Paper';

class EventMap extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
     event: {
        eventName: 'Default',
        eventTime: '12:00',
        eventLatitude: 40.7505, 
        eventLongitude: -73.9764
      },
      users : [],
      userLocation: {
        lat: '',
        lng: ''
      },
      userId: this.getUserId(),
      eventId: this.getEventId()
    }

    this.handleNewAttendee = this.handleNewAttendee.bind(this);
    this.getServerData = this.getServerData.bind(this)
    this.getUserLocation();
  }
  
  componentDidMount () {
    this.getServerData();
    setInterval(this.getServerData, 1000 * 30);
  }

  handleNewAttendee (attendee) {
    if(this.isUniqueAttendee(attendee)) {
      axios.post('/user', {
        attendee: attendee,
        eventId: this.state.eventId
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
    } else {
      window.alert('Attendee with that phone number already invited!');
    }
  }

  isUniqueAttendee(attendee) {
    return this.state.users.reduce((isUnique, currentAttendee) => {
      return isUnique && attendee.phoneNumber !== currentAttendee.phoneNumber;
    }, true);
  }
  getEventId () {
    return this.props.match.params.number;
  }

  getServerData () {
    axios.get('/event', {
      params: {
        eventId: this.state.eventId
      }
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.users[0]);
      this.setState({
        event: response.data.event,
        users: response.data.users
      });
    })
    .catch((error) => console.error(error));
  }

  sendUserLocation () {
    axios.put('/user', {
      userId: this.state.userId,
      lat: this.state.userLocation.lat,
      lng: this.state.userLocation.lng
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  }

  getUserId () {
    return this.props.location.search.replace('?userId=', '');
  }

  getUserLocation () {
    const geoSuccess = (position) => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, this.sendUserLocation);
    }

    const geoError = (error) => {
      console.error('Error getting location:', error.message);
    }

    navigator.geolocation.watchPosition(geoSuccess, geoError);
  }

  render () {
    let style = {
      paper : {
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        padding: 5,
        marginLeft: '18%'
      }
    }
    return (
      <Paper style={style.paper} zDepth={2}>
        <h1> Wayn </h1>
        <h4> Your Event </h4>
        {this.state.users.length ? <AttendeeMap users={this.state.users} event={this.state.event} directions={[]}/>
        : <p>Map will be rendered when someone uploads their location! </p>}
        <AddAttendee addNewAttendee={this.handleNewAttendee} />
      </Paper>
    );
  }
}

export default EventMap;

