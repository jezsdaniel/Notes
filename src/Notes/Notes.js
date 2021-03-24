import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NotesContext} from '../NotesContext';
import CenterMessage from '../components/CenterMessage';
import {colors} from '../theme';

const Notes = ({navigation}) => {
  const {notes} = useContext(NotesContext);

  const navigate = item => {
    navigation.navigate('Note', {note: item});
  };

  return (
    <ScrollView contentContainerStyle={[!notes.length && {flex: 1}]}>
      <View style={[!notes.length && {justifyContent: 'center', flex: 1}]}>
        {!notes.length && <CenterMessage message="No saved notes!" />}
        {notes.map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigate(item)}>
            <View style={styles.noteContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryColor,
  },
  title: {
    fontSize: 20,
  },
});

export default Notes;
