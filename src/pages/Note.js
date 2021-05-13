import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import uuidV4 from 'uuid/dist/v4';

import {colors} from '../theme';
import {AppContext} from '../AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Note = ({navigation, route}) => {
  const {addNote, updateNote, deleteNote} = useContext(AppContext);

  const [noteContent, setNoteContent] = useState({
    title: route.params ? route.params.note.title : '',
    content: route.params ? route.params.note.content : '',
  });

  const submitNote = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const currentDateTime = currentDate + ', ' + currentTime;

    if (route.params) {
      const note = {
        title: noteContent.title,
        content: noteContent.content,
        id: route.params.note.id,
        date: currentDateTime,
      };
      updateNote(note);
    } else {
      const note = {
        title: noteContent.title,
        content: noteContent.content,
        id: uuidV4(),
        date: currentDateTime,
      };
      addNote(note);
    }
    setNoteContent({title: '', content: ''});
    navigation.navigate('Notes');
  };

  const handleDeleteNote = () => {
    Alert.alert(
      'Delete note?',
      'Are you sure you want to permanently delete this message?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNote(route.params.note);
            navigation.navigate('Notes');
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (noteContent.title && noteContent.content) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={submitNote}>
            <Text
              style={{
                color: colors.primaryColor,
                marginRight: 15,
                fontSize: 20,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={submitNote} disabled>
            <Text
              style={{
                color: 'gray',
                marginRight: 15,
                fontSize: 20,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  });

  const onChangeText = (key, value) => {
    setNoteContent({
      ...noteContent,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          onChangeText={val => onChangeText('title', val)}
          style={styles.inputTitle}
          selectionColor={colors.primaryColor}
          value={noteContent.title}
        />
        <TextInput
          placeholder="Content"
          onChangeText={val => onChangeText('content', val)}
          style={styles.inputContent}
          selectionColor={colors.primaryColor}
          value={noteContent.content}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
      {route.params && (
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleDeleteNote}>
            <Ionicons name="trash-outline" size={25} color="#ff5f5f" />
          </TouchableOpacity>
        </View>
      )}
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
    flex: 1,
  },
  inputTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputContent: {
    fontSize: 20,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Note;
