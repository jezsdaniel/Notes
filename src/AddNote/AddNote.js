import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import uuidV4 from 'uuid/dist/v4';

import {NotesContext} from '../NotesContext';
import {colors} from '../theme';

const AddNote = ({navigation}) => {
  const {addNote} = useContext(NotesContext);

  const [noteContent, setNoteContent] = useState({title: '', content: ''});

  const onChangeText = (key, value) => {
    setNoteContent({
      ...noteContent,
      [key]: value,
    });
  };

  const submit = () => {
    if (noteContent.title === '' || noteContent.content === '') {
      alert('Please complete the note');
    }
    const note = {
      title: noteContent.title,
      content: noteContent.content,
      id: uuidV4(),
      color: '',
    };
    addNote(note);
    setNoteContent({title: '', content: ''});
    navigation.navigate('Notes');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        onChangeText={val => onChangeText('title', val)}
        style={styles.input}
        value={noteContent.title}
      />
      <TextInput
        placeholder="Content"
        onChangeText={val => onChangeText('content', val)}
        style={styles.inputContent}
        value={noteContent.content}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={16}
      />
      <TouchableOpacity onPress={submit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add note</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 50,
  },
  inputContent: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
});

export default AddNote;