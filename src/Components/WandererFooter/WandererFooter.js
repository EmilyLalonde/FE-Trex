import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native';

export default class WandererFooter extends Component {

  constructor(props) {
    super(props)
  }
  
  render() {

    //pass user_id to each of the navigations

    return(
      <View style={styles.footer}>
            <TouchableOpacity
            
            onPress={() => this.props.navigate('MyTrips')}
            >
              <Text style={styles.footerText}>Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigate('SafetyInfo')}
            >
              <Text style={styles.footerText}>Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity
            
            onPress={() => this.props.navigate('MyFollowers')}>
              <Text style={styles.footerText}>Followers</Text>
            </TouchableOpacity>

          </View>
    )
  }
}


const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1C4263',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    height: 60
  }, 
  footerText: {
    color: 'white',
    fontSize: 20
  }
})