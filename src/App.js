import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {NavigationContainer} from '@react-navigation/native';

import {AppContext} from './AppContext';
import NotesStack from './routes';

const key = 'notes';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const dbNotes = MMKV.getString(key);
      const objectNotes = JSON.parse(dbNotes);
      setNotes(objectNotes);
    } catch (e) {
      console.log('Error from MMKV: ' + e);
    }
  }, []);

  const addNote = note => {
    const tempNotes = notes;
    tempNotes.push(note);

    setNotes([...tempNotes]);
    MMKV.set(key, JSON.stringify(tempNotes));
  };

  const updateNote = note => {
    const index = notes.findIndex(item => {
      return item.id === note.id;
    });
    const tempNotes = [
      ...notes.slice(0, index),
      note,
      ...notes.slice(index + 1),
    ];
    setNotes([...tempNotes]);
    MMKV.set(key, JSON.stringify(tempNotes));
  };

  const deleteNote = note => {
    const index = notes.findIndex(item => {
      return item.id === note.id;
    });
    const tempNotes = [...notes.slice(0, index), ...notes.slice(index + 1)];
    setNotes([...tempNotes]);
    MMKV.set(key, JSON.stringify(tempNotes));
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
