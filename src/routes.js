import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from './theme';
import Notes from './Notes/Notes';
import Note from './Notes/Note';
import AddNote from './AddNote/AddNote';

const NotesNav = createStackNavigator();

const NotesStack = () => {
  return (
    <NotesNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerTintColor: '#fff',
      }}>
      <NotesNav.Screen
        name="Notes"
        component={Notes}
        options={{
          title: 'Notes',
        }}
      />
      <NotesNav.Screen
        name="Note"
        component={Note}
        options={({route}) => ({
          title: route.params.note.title,
        })}
      />
    </NotesNav.Navigator>
  );
};

const TabsNav = createBottomTabNavigator();

const Tabs = () => {
  return (
    <TabsNav.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Notes') {
            iconName = focused ? 'copy' : 'copy-outline';
          } else if (route.name === 'AddNote') {
            iconName = focused ? 'create' : 'create-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primaryColor,
        inactiveTintColor: 'gray',
      }}>
      <TabsNav.Screen name="Notes" component={NotesStack} />
      <TabsNav.Screen name="AddNote" component={AddNote} />
    </TabsNav.Navigator>
  );
};

export default Tabs;
