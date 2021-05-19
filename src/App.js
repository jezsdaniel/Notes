import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {NavigationContainer} from '@react-navigation/native';

import {AppContext} from './AppContext';
import NotesStack from './routes';

const key = 'notes';

const App = () => {
  const getDbNotes = () => {
    if (!MMKV.getString(key)) {
      return [];
    }

    try {
      const dbNotes = MMKV.getString(key);
      const objectNotes = JSON.parse(dbNotes);
      return objectNotes;
    } catch (e) {
      console.log('Error from MMKV: ' + e);
      return [];
    }
  };

  const [notes, setNotes] = useState(getDbNotes);

  useEffect(() => {
    MMKV.set(key, JSON.stringify(notes));
  }, [notes]);

  const addNote = note => {
    setNotes([...notes, note]);
  };

  const updateNote = note => {
    const index = notes.findIndex(item => {
      return item.id === note.id;
    });

    setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)]);
  };

  const deleteNote = note => {
    const index = notes.findIndex(item => {
      return item.id === note.id;
    });

    setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
  };

  return (
    <NavigationContainer>
      <AppContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
        <NotesStack />
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;
