import React from 'react';
import { Button, Text, View } from 'react-native';

const AdminPanel = () => {
  return (
    <View>
      <Text>User Management</Text>
      <Button title="Add User" onPress={() => {}} />
      <Button title="Edit User" onPress={() => {}} />
      <Button title="Delete User" onPress={() => {}} />
      <Text>Incident Logs</Text>
      <Text>View past incidents & actions taken</Text>
      <Text>System Settings</Text>
      <Text>Customize alert preferences and access levels</Text>
    </View>
  );
};

export default AdminPanel;