import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';

const IncidentResponse = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Incident Details</Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>Active</Text></Text>
      <Text style={styles.label}>Severity: <Text style={styles.value}>High</Text></Text>
      <Text style={styles.label}>Assigned Responders: <Text style={styles.value}>John Doe</Text></Text>
      <Text style={styles.subHeader}>Assign Tasks</Text>
      <Picker style={styles.picker}>
        <Picker.Item label="Responder 1" value="responder1" />
        <Picker.Item label="Responder 2" value="responder2" />
        {/* Add more options as needed */}
      </Picker>
      <Text style={styles.subHeader}>Resource Allocation</Text>
      <Text style={styles.label}>Equipment: <Text style={styles.value}>Fire Truck</Text></Text>
      <Text style={styles.label}>Personnel: <Text style={styles.value}>5</Text></Text>
      <Button title="Live Chat" onPress={() => {}} />
      <Button title="Video Call" onPress={() => {}} />
      <Text style={styles.subHeader}>Resolution Updates & Log History</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default IncidentResponse;