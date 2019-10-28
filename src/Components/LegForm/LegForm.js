import React, { Component } from "react";
import DatePicker from 'react-native-datepicker';
import MapInput from '../MapInput/MapInput'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import WandererFooter from '../WandererFooter/WandererFooter';
import WandererHeader from '../WandererHeader/WandererHeader';
import { postNewLeg, patchLeg, deleteLeg } from '../../util/apiCalls';

export default class LegForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      tripId: this.props.navigation.getParam('tripId'),
      leg: this.props.navigation.getParam('leg') || null,
      error: '',
      user: {id: 1},
      // we will need to pass this user object dyanmically
      loc: ''
    };
  }

  handler(arg) {
    this.setState({
      loc: arg
    });
    return;
  }

  componentDidMount = () => {
    if (this.state.leg) {
      let { startDate, endDate, startLocation, endLocation } = this.state.leg
      this.setState({
        startLocation,
        startDate,
        endLocation,
        endDate
      })
    }
  }

  handleNewLegSave = async () => {

    let updatedTripId;

    if(!this.props.navigation.getParam('leg')) {
      updatedTripId = await this.createNewLeg();
    } else {
      updatedTripId = await this.editLeg();
    }
    this.props.navigation.navigate('Trip', {tripId: updatedTripId})
  }

  createNewLeg = async () => {
    let {startLocation, endLocation, startDate, endDate, tripId} = this.state;
    let newLegInfo = {
      startLocation,
      endLocation,
      startDate,
      endDate,
      tripId
    }

    try {
      let updatedTripId = await postNewLeg(newLegInfo);
      return updatedTripId
    }
    catch (error) {
      this.setState({ error: 'There was an error creating your leg'})
    }
  }

  editLeg = async () => {
    let id = this.state.leg.id
    let {startLocation, endLocation, startDate, endDate, tripId} = this.state;

    let editedLegInfo = { 
      startLocation,
      endLocation,
      startDate,
      endDate,
      tripId,
      id
    }
    try {
      let editedTripId = await patchLeg(editedLegInfo)
      return editedTripId
    }
    catch (error) {
      this.setState({error: 'There was an error editing your leg'})
    }
  }

  removeLeg = async () => {
    try {
      await deleteLeg(this.state.leg.id);
      this.props.navigation.navigate('Trip')
    } catch (error) {
      this.setState({ error: 'There was an error deleting your leg'})
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <WandererHeader />
        <ScrollView>

        <View>
            {this.state.leg === null && <Text style={styles.title}>Add A New Leg</Text>}
            {this.state.leg && <Text style={styles.title}>Edit Leg</Text>}
          </View>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Start Destination</Text>
      <View style={styles.form}>
      {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Start Destination..."
            placeholderTextColor='white'
            maxLength={20}
            onBlur={Keyboard.dismiss}
            value={this.state.startLocation}
            onChangeText={startLocation => this.setState({ startLocation })}
          />
          </View>
          
          /> */}
          <MapInput handler={this.handler.bind(this)} />
          <Text style={styles.label}>End Destination</Text>
          <View style={styles.form}></View>
          <TextInput
            style={styles.input}
            placeholder="Enter End Destination..."
            placeholderTextColor='white'
            maxLength={20}
            onBlur={Keyboard.dismiss}
            value={this.state.endLocation}
            onChangeText={endLocation => this.setState({ endLocation })}
          />
          </View>
          <Text style={styles.text}>Start Date</Text>
          <DatePicker
          style={{ width: 370, height: 65 }}
          date={this.state.startDate}
          mode="date"
          placeholder="Select End Date"
          placeholderTextColor='white'
          format="MM-DD-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              left: 0,
              top: 4
            },
            dateInput: {
              marginLeft: 15,
              color: "white",
              height: 60,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "white",
            },
            dateText: {
              fontSize: 24,
              color: "white",
            }
          }}
          onDateChange={(date) => {this.setState({startDate: date})}}
        />
        <Text style={styles.text}>End Date</Text>
        <DatePicker
          style={{ width: 370, height: 65 }}
          date={this.state.endDate}
          mode="date"
          placeholder="Select End Date"
          placeholderTextColor='white'
          format="MM-DD-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              left: 0,
              top: 4
            },
            dateInput: {
              marginLeft: 15,
              color: "white",
              height: 60,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "white",
            },
            dateText: {
              fontSize: 24,
              color: "white",
            }
          }}
          onDateChange={(date) => {this.setState({endDate: date})}}
        />
        <View style={styles.sideBySideContainer}>
          <TouchableOpacity style={styles.sideBySideButton}>
            <Text style={styles.buttonText} onPress={() => navigate('AddTransportInfo')}>Add Transport</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideBySideButton}>
            <Text style={styles.buttonText} onPress={() => navigate('AddLodgingInfo')}>Add Lodging</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.handleNewLegSave}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
          {this.props.navigation.getParam('leg') && 
          <TouchableOpacity style={styles.deleteButton} onPress={this.removeLeg}>
          <Text style={styles.buttonText}>Delete Leg</Text>
          </TouchableOpacity>
          }
          

          {this.state.error !== '' && <Text style={styles.text}>{this.state.error}</Text>}
          </View>
      </ScrollView>
      <WandererFooter navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    paddingVertical: 25
  },
  inputContainer: {
    marginTop: 15
  }, 
  text: {
    marginLeft: 20,
    fontSize: 20,
    color: "white",
    paddingVertical: 12
  },
  deleteButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    width: "auto",
    height: 60,
    margin: 20,
    padding: 10,
    color: "white",
    textAlign: "center",
    backgroundColor: "red"
  },
  input: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10
  },
  form: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    height: 60,
    width: 350,
    color: 'white',
    padding: 10,
    marginLeft: 15,
    marginBottom: 10
  },
  sideBySideContainer: {
    flex: 1,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingVertical: 10
  },
  sideBySideButton: {
    width: 170,
    borderColor: "#768DA1",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    height: 60,
    margin: 20,
    fontSize: 30,
    padding: 10,
    color: "white",
    textAlign: "center",
    backgroundColor: "#1C4263",
    alignItems: "stretch"
  },
  button: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    width: "auto",
    height: 60,
    margin: 20,
    fontSize: 30,
    padding: 10,
    color: "white",
    textAlign: "center",
    backgroundColor: "#1C4263"
  },
  label: {
    marginLeft: 20,
    fontSize: 20,
    color: "white",
    marginBottom: 5
  }
});
