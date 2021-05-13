import React, {useContext} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppContext} from '../AppContext';
import CenterMessage from '../components/CenterMessage';
import {colors} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notes = ({navigation}) => {
  const {notes, deleteNote} = useContext(AppContext);

  const navigateToNote = item => {
    navigation.navigate('Note', {note: item});
  };

  const navigateToNewNote = () => {
    navigation.navigate('Note');
  };

  const onLongPressNote = item => {
    Alert.alert(
      'Delete note?',
      'Are you sure you want to permanently delete this message?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNote(item);
          },
        },
      ],
    );
  };

  function getNotesNumberString() {
    if (notes.length === 0) {
      return 'No notes';
    } else if (notes.length === 1) {
      return 'One note';
    }
    return notes.length + ' notes';
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[!notes.length && {flex: 1}]}>
        <View style={[!notes.length && {justifyContent: 'center', flex: 1}]}>
          {!notes.length && <CenterMessage message="No saved notes yet." />}
          {notes.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToNote(item)}
              onLongPress={() => onLongPressNote(item)}>
              <View
                style={[
                  styles.noteContainer,
                  index === 0 ? styles.firstNote : '',
                  index === notes.length - 1 ? styles.lastNote : '',
                ]}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Text>{getNotesNumberString()}</Text>
        <TouchableOpacity onPress={() => navigateToNewNote()}>
          <Ionicons
            name="create-outline"
            size={25}
            color={colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryColor,
  },
  firstNote: {
    marginTop: 15,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  lastNote: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
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

export default Notes;
