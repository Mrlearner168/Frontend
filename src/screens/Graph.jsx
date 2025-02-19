// filepath: /c:/Users/Rogel/OneDrive/Desktop/UIRS-V2/UIRS/src/screens/Graph.jsx
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Graph = () => {
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View>
      <Text>Graph Component</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default Graph;