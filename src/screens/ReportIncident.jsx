
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const API_URL = "http://192.168.165.174:5000"; 

const ReportIncident = () => {
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [media, setMedia] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false); // state to control the time picker

  const handlePickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia([...media, result.assets[0]]);
    }
  };

  // Contact validation (email or phone)
  const validateContactInfo = (contact) => {
    const phoneRegex = /^[0-9]{10}$/; // Example phone number validation (10 digits)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation regex
    return phoneRegex.test(contact) || emailRegex.test(contact);
  };

  // Form validation
  const validateForm = () => {
    if (!incidentType || !severity || !location || !incidentDescription || !incidentTime || !contactInfo) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }

    if (!validateContactInfo(contactInfo)) {
      Alert.alert("Validation Error", "Please provide a valid email or phone number.");
      return false;
    }

    return true;
  };

  // Show the time picker
  const showTimePickerDialog = () => {
    setShowTimePicker(true);
  };

  // Handle the time change
  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || incidentTime;
    setShowTimePicker(Platform.OS === 'ios'); // Keep the time picker visible on iOS after selection
    setIncidentTime(currentDate.toLocaleTimeString()); // Format the time to a string
  };

  const handleSubmit = async () => {
    if (!incidentType) setIncidentType('');
    if (!severity) setSeverity('');
    if (!location) setLocation('');
    if (!incidentDescription) setIncidentDescription('');
    if (!incidentTime) setIncidentTime('');
    if (!contactInfo) setContactInfo('');

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('incidentType', incidentType);
    formData.append('severity', severity);
    formData.append('location', location);
    formData.append('incidentDescription', incidentDescription);
    formData.append('incidentTime', incidentTime);
    formData.append('contactInfo', contactInfo);

    media.forEach((item, index) => {
      let uriParts = item.uri.split(".");
      let fileType = uriParts[uriParts.length - 1];

      formData.append("media", {
        uri: item.uri,
        name: `media_${index}.${fileType}`,
        type: item.mime || `image/${fileType}` || `video/${fileType}`,
      });
    });

    try {
      const response = await axios.post(`${API_URL}/report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        Alert.alert("Incident Reported", "Your incident report has been submitted successfully.");
        setIncidentType('');
        setSeverity('');
        setLocation('');
        setIncidentDescription('');
        setIncidentTime('');
        setContactInfo('');
        setMedia([]);
      } else {
        Alert.alert("Submission Failed", `Server returned an unexpected status: ${response.status}`);
      }

    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert("Submission Failed", "An error occurred while submitting.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Incident Type</Text>
        <Picker selectedValue={incidentType} onValueChange={setIncidentType} style={styles.picker}>
          <Picker.Item label="Select Incident Type" value="" />
          <Picker.Item label="Natural Disaster" value="natural_disaster" />
          <Picker.Item label="Road Incidents" value="road_incidents" />
          <Picker.Item label="Cyber Attack" value="cyber_attack" />
        </Picker>

        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="GPS Auto-detect or Manual Input"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        <Text style={styles.label}>Severity</Text>
        <Picker selectedValue={severity} onValueChange={setSeverity} style={styles.picker}>
          <Picker.Item label="Select Severity" value="" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Critical" value="critical" />
        </Picker>

        <Text style={styles.label}>Incident Description</Text>
        <TextInput
          placeholder="Provide a detailed description"
          value={incidentDescription}
          onChangeText={setIncidentDescription}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />

      <Text style={styles.label}>Incident Time</Text>
        <TextInput
          placeholder="HH:MM (24-hour format)" // Provide instructions
          value={incidentTime}
          onChangeText={setIncidentTime}
          style={styles.input}
          keyboardType="numeric" // Optional: Show numeric keyboard
        />

        <Text style={styles.label}>Contact Information</Text>
        <TextInput
          placeholder="Your contact (email/phone)"
          value={contactInfo}
          onChangeText={setContactInfo}
          style={styles.input}
        />

        <View style={styles.mediaContainer}>
          {media.map((item, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: item.uri }} style={styles.media} />
              <Text 
                style={styles.removeButton} 
                onPress={() => setMedia(media.filter((_, i) => i !== index))}
              >
                ❌
              </Text>
            </View>
          ))}
        </View>

        <Button title="Pick Media" onPress={handlePickMedia} color="#4CAF50" />
        <Button title="Submit Incident Report" onPress={handleSubmit} color="#2196F3" />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f4f7',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 12,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  media: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 20,
    color: 'red',
    padding: 5,
  },
});

export default ReportIncident;
