/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import TransactionsPage from './TransactionsPage';
import ProfilePage from './ProfilePage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function DashboardPage() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Transactions') {
            iconName = 'exchange';
          } else if (route.name === 'Save') {
            iconName = 'money';
          } else {
            iconName = 'user';
          }
          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#F49B21',
        tabBarInactiveTintColor: '#ddd',
        tabBarStyle: {
          backgroundColor: '#37517E',
        },
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Save" component={HomePage} />
      <Tab.Screen name="Transactions" component={TransactionsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}     

export default DashboardPage;
