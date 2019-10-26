
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home/Home';
import MyTrips from './MyTrips/MyTrips';
import TripForm from './TripForm/TripForm';
import Trip from './Trip/Trip';
import LegForm from './LegForm/LegForm';
import { MyFollowers } from './MyFollowers/MyFollowers';
import FollowerForm from './FollowerForm/FollowerForm';
import { SafetyInfo } from './SafetyInfo/SafetyInfo';
import AddLodgingInfo from './AddLodgingInfo/AddLodgingInfo';
import AddTransportInfo from './AddTransportInfo/AddTransportInfo';
import { Leg } from './Leg/Leg';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerBackTitle: 'Home',
      headerTransparent: true,
      // headerStyle: { backgroundColor: 'black' },
      // headerTitleStyle: { color: 'white' },
      headerBackTitleStyle: { color: 'white'}
    }
  },
  MyTrips: {
    screen: MyTrips,
    navigationOptions: {
      headerBackTitle: 'My Trips',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  TripForm: {
    screen: TripForm,
    navigationOptions: {
      headerBackTitle: 'Add Trip',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  Trip: {
    screen: Trip,
    navigationOptions: {
      headerBackTitle: 'Trip',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  LegForm: {
    screen: LegForm,
    navigationOptions: {
      headerBackTitle: 'Add Leg',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  MyFollowers: {
    screen: MyFollowers,
    navigationOptions: {
      headerBackTitle: 'My Followers',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  FollowerForm: {
    screen: FollowerForm,
    navigationOptions: {
      headerBackTitle: 'Add Follower',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  SafetyInfo: {
    screen: SafetyInfo,
    navigationOptions: {
      headerBackTitle: 'Safety Info',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  AddLodgingInfo: {
    screen: AddLodgingInfo,
    navigationOptions: {
      headerBackTitle: 'Add Lodging',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  AddTransportInfo: {
    screen: AddTransportInfo,
    navigationOptions: {
      headerBackTitle: 'Add Transportation',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  },
  Leg: {
    screen: Leg,
    navigationOptions: {
      headerBackTitle: 'Leg',
      headerTransparent: true,
      headerBackTitleStyle: { color: 'white'} 
    }
  }
});

export default createAppContainer(RootStack);
