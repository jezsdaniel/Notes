import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Notes from './pages/Notes';
import Note from './pages/Note';

const NotesNav = createStackNavigator();

const NotesStack = () => {
  return (
    <NotesNav.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
        headerTintColor: '#333',
      }}>
      <NotesNav.Screen
        name="Notes"
        component={Notes}
        options={{
          title: 'Notes',
          headerStyle: {
            backgroundColor: '#f2f2f2',
            height: 70,
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 26,
          },
        }}
      />
      <NotesNav.Screen
        name="Note"
        component={Note}
        options={({route}) => ({
          title: route.params ? route.params.note.date : 'New note',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            color: '#777',
          },
        })}
      />
    </NotesNav.Navigator>
  );
};

export default NotesStack;
