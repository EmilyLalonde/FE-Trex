import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer'

export default class Home extends Component {

  render() {

      const {navigate} = this.props.navigation;

    return (

      <View style={styles.container}>

        <Header />

        <ScrollView>
          <Text style={styles.text}>Welcome to Ariva</Text>
          
            <Text style={styles.text}>I am a ...</Text>
            <TouchableOpacity>
              <Text style={styles.button}>Wanderer</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}>Follower</Text>
            </TouchableOpacity>


        </ScrollView>
  
       <Footer navigate={navigate} />
        
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
    
  }, 
  text: {
    color: 'white',
    marginVertical: 40,
    textAlign: 'center',
    fontSize: 30,
    width: 'auto'
  },
  header: {
    backgroundColor: '#1C4263',
    color: 'white',
    paddingTop: 60,
    paddingLeft: 10,
    // height: 'auto',,
    textAlign: 'center',
    top: 0,
    fontSize: 50,
  }, 
  button: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'solid',
    width: 'auto',
    height: 60,
    margin: 20,
    fontSize: 30,
    padding: 10,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#1C4263'
  },
  footer: {
    backgroundColor: '#1C4263',
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-around'
  }, 
  footerText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 20
  }
});




