import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Screens
import Dashboard from './src/screens/Dashboard';
import Graph from './src/screens/Graph';
import IncidentResponse from './src/screens/IncidentResponse';
import Login from './src/screens/login';
import Profile from './src/screens/Profile';
import Register from './src/screens/Register';
import ReportIncident from './src/screens/ReportIncident';
import Statistics from './src/screens/Statistics';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Report') {
            iconName = 'add-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Report" component={ReportIncident} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function DashboardScreen() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/incidents')
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Error fetching incidents:', error));
  }, []);

  return (
    <View>
      {/* Render incidents */}
      {incidents.map((incident, index) => (
        <Text key={index}>{incident.incidentDescription}</Text>
      ))}
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={HomeTabs} />
      <Drawer.Screen name="Incident Response" component={IncidentResponse} />
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Graph" component={Graph} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

