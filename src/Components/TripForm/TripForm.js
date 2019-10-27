import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import WandererFooter from "../WandererFooter/WandererFooter";
import WandererHeader from "../WandererHeader/WandererHeader";
import { postNewTrip, patchTrip, deleteTrip } from "../../util/apiCalls";

export default class TripForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      startDate: "",
      endDate: "",
      userId: this.props.navigation.getParam("userId"),
      trip: this.props.navigation.getParam("trip") || null,
      error: ""
    };
  }

  componentDidMount = () => {
    if (this.state.trip) {
      let { name, startDate, endDate } = this.state.trip;
      this.setState({
        name,
        startDate,
        endDate
      });
    }
  };

  handleNewTripSave = async () => {
    if (!this.props.navigation.getParam("trip")) {
      this.createNewTrip();
    } else {
      this.editTrip();
    }
  };

  createNewTrip = async () => {
    let { name, startDate, endDate, userId } = this.state;

    let newTripInfo = {
      name,
      startDate,
      endDate,
      userId
    };

    try {
      let newTrip = await postNewTrip(newTripInfo);
      this.props.navigation.navigate("Trip", {
        trip: newTrip,
        userId: this.state.userId
      });
    } catch (error) {
      this.setState({ error: "There was an error creating your trip" });
    }
  };

  editTrip = async () => {
    let { name, startDate, endDate, trip } = this.state;

    let editedTripInfo = {
      name,
      startDate,
      endDate,
      id: trip.id
    };

    try {
      let editedTrip = await patchTrip(editedTripInfo);
      this.props.navigation.navigate("Trip", {
        trip: editedTrip,
        userId: this.state.userId
      });
    } catch (error) {
      this.setState({ error: "There was an error editing your trip" });
    }
  };

  removeTrip = async () => {
    try {
      let deletedTrip = await deleteTrip(this.state.trip.id);
      this.props.navigation.navigate("MyTrips");
    } catch (error) {
      this.setState({ error: "There was an error deleting your trip" });
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <WandererHeader />

        <ScrollView>
          <View>
            {this.state.trip === null && (
              <Text style={styles.title}>Add A New Trip</Text>
            )}
            {this.state.trip && <Text style={styles.title}>Edit Trip</Text>}
          </View>

            <Text style={styles.label}>Trip Name</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={(this.state.trip && this.state.name) || "Enter Trip Name..."}
              placeholderTextColor='white'
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              onBlur={Keyboard.dismiss}
            />
          </View>
          <Text style={styles.text}>Start Date</Text>
          <DatePicker
            style={{ width: 370, height: 65 }}
            date={this.state.startDate}
            mode="date"
            placeholder="Select Start Date"
            placeholderTextColor='white'
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                left: 0,
                top: 4,
              },
              dateInput: {
                marginLeft: 15,
                color: "white",
                height: 60,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "white"
              },
              dateText: {
                fontSize: 24,
                color: "white",
              }
            }}
            onDateChange={date => {
              this.setState({ startDate: date });
            }}
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
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
          />

          <View style={styles.sideBySideContainer}>
            <TouchableOpacity
              style={styles.sideBySideButton}
              onPress={() => navigate("MyTrips")}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sideBySideButton}
              onPress={this.handleNewTripSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {this.props.navigation.getParam("trip") && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={this.removeTrip}
            >
              <Text style={styles.buttonText}>Delete Trip</Text>
            </TouchableOpacity>
          )}

          {this.state.error !== "" && (
            <Text style={styles.buttonText}>{this.state.error}</Text>
          )}
        </ScrollView>
        <WandererFooter navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    paddingVertical: 25
  },
  deleteButton: {
    color: "white",
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "white"
  },
  input: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 26,
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
  text: {
    marginLeft: 20,
    fontSize: 20,
    color: "white",
    paddingVertical: 13
  },
  label: {
    marginLeft: 20,
    fontSize: 20,
    color: "white",
    marginBottom: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  sideBySideContainer: {
    flex: 1,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-around"
    // justifyContent: 'flex-start'
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingVertical: 10
  },
  button: {
    borderColor: "#768DA1",
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
    backgroundColor: "#1C4263",
    alignItems: "stretch"
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
  }
});
