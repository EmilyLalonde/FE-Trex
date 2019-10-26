import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

import WandererHeader from '../WandererHeader/WandererHeader';
import WandererFooter from '../WandererFooter/WandererFooter'

export default class Home extends Component {
  constructor(props) {
    super(props) 
      this.state = {

      }
  }

  render() {
      const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <WandererHeader />
        <ScrollView>
          <Text style={styles.text}>Welcome to Ariva</Text>
            <Text style={styles.text}>I am a ...</Text>
            <TouchableOpacity>
              <Text style={styles.button}>Wanderer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('FollowerDashboard')}>
              <Text style={styles.button}>Follower</Text>
            </TouchableOpacity>


        </ScrollView>
  
       <WandererFooter navigate={navigate} />
        
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  }, 
  text: {
    color: 'white',
    marginVertical: 40,
    textAlign: 'center',
    fontSize: 30,
    width: 'auto'
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
    backgroundColor: '#1C4263',
    alignItems: 'stretch'
  }
});




