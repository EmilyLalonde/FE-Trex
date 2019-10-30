import React, { Component } from "react";
import FollowerHeader from '../FollowerHeader/FollowerHeader'
import FollowerFooter from '../FollowerFooter/FollowerFooter'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image
} from "react-native";

import followerSpinner from '../../../assets/follower_spinner.gif';
import { 
  fetchFollowers,
  fetchWanderersIncomingNotifications 
} from '../../util/apiCalls.js';

export default class FollowerDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.navigation.getParam('userId'),
      error: '',
      wanderers: [],
      messages: []
    }
  }

  componentDidMount = async () => {
    try {
      // fetch messages, filter by unread and display count within wanderer element
      let wanderers = await fetchFollowers(this.state.userId)
      this.setState({ wanderers })
      let messages = await fetchWanderersIncomingNotifications(this.state.userId)
      this.setState({ messages })
      this.setState({ error: '' })

    } catch (error) {
      this.setState({ error: 'There was an error loading your wanderers'})
    }
  } 

  //generate Wanderer elements -- send messages from them to the MyWanderer component

  generateWanderersElements = () => {
    let wanderersElements = this.state.wanderers.map(wanderer => {

      let incomingMessagesFromWanderer = this.state.messages.filter(message => {
        return message.senderId == wanderer.id
      })

      let unreadMessagesFromWanderer = incomingMessagesFromWanderer.filter(message => {
        return message.unread === true
      })

      let { navigate } = this.props.navigation;
      return (
        <TouchableOpacity 
          key={this.state.userId+wanderer.name} 
          style={styles.wandererButton} 
          onPress={() => navigate('MyWanderer', {
            wanderer, 
            userId: this.state.userId,
            messages: incomingMessagesFromWanderer
            })}>
          <Text style={styles.buttonText}>
            {wanderer.name}
            {unreadMessagesFromWanderer.length > 0 && <>  ({unreadMessagesFromWanderer.length} unread)</>}
          </Text>
        </TouchableOpacity>
      )
    })

    return wanderersElements;
  }



  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          <FollowerHeader />
      <ScrollView>
        <Text style={styles.text}>My Wanderers</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigate("MyWanderer")}>
        <Text style={styles.buttonText}>Fake Wanderer 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigate("MyWanderer")}>
        <Text style={styles.buttonText}>Fake Wanderer 2</Text>
      </TouchableOpacity>
      {this.state.error === '' && this.state.wanderers.length == 0 &&
        <Image alt={'Loading...'} style={styles.loading} source={followerSpinner} />
      }
      {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
      {this.state.error === '' && this.state.messages.length !==0 && 
        this.generateWanderersElements()
      }
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }, 
  text: {
    color: 'black',
    marginVertical: 40,
    textAlign: 'center',
    fontSize: 30,
    width: 'auto'
  }, 
  error: {
    color: 'red',
    marginVertical: 40,
    textAlign: 'center',
    fontSize: 30,
    width: 'auto'
  },
  wandererButton: {
    width: 'auto',
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    height: 60,
    margin: 20,
    fontSize: 30,
    padding: 10,
    color: "white",
    textAlign: "center",
    backgroundColor: "#84183B",
    alignItems: "stretch"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingVertical: 10
  },
  loading: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});