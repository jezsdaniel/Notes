import React, {useEffect, useState} from 'react';
import Tabs from './src/routes';
import {NotesContext} from './src/NotesContext';
import {MMKV} from 'react-native-mmkv';
import {NavigationContainer} from '@react-navigation/native';

const key = 'notes';

const App: () => Node = () => {
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
    console.log(tempNotes.length);
    tempNotes.push(note);
    console.log(tempNotes.length);

    setNotes([...tempNotes]);
    MMKV.set(key, JSON.stringify(tempNotes));
  };

  const setNoteColor = (color, note) => {
    const index = notes.findIndex(item => {
      return item.id === note.id;
    });
    const chosenNote = notes[index];
    chosenNote.color = color;
    const tempNotes = [
      ...notes.slice(0, index),
      chosenNote,
      ...notes.slice(index + 1),
    ];
    setNotes(tempNotes);
    MMKV.set(key, JSON.stringify(tempNotes));
  };

  return (
    <NavigationContainer>
      <NotesContext.Provider value={{notes, addNote, setNoteColor}}>
        <Tabs />
      </NotesContext.Provider>
    </NavigationContainer>
  );
};

export default App;
