import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput
} from "react-native";

export default class AddTransportInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTrans: "",
      endTrans: "",
      dateTrans: ""
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Start Destination"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.startTrans}
              onChangeText={startTrans => this.setState({ startTrans })}
            />
            <TextInput
              style={styles.textInput}
              placeholder="End Destination"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.endTrans}
              onChangeText={endTrans => this.setState({ endTrans })}
            />
            <DatePicker
              style={{ width: 200 }}
              date={this.state.dateTrans}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ dateTrans: date });
              }}
            />
            <TouchableOpacity>
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  inputContainer: {
    marginTop: 15
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20
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
  }
});
