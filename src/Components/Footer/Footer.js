import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native';

export default class Footer extends Component {

  constructor(props) {
    super(props)
  }
  
  render() {


    return(
      <View style={styles.footer}>
            <TouchableOpacity
            
            onPress={() => this.props.navigate('MyTrips')}
            >
              <Text style={styles.footerText}>Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerText}>Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity>
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
    padding: 30,
    justifyContent: 'space-around'
  }, 
  footerText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 20
  }
})