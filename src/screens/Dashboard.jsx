import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = useCallback(async () => { // useCallback for onRefresh
    setRefreshing(true); // Set refreshing to true before fetching
    try {
      const response = await axios.get("http://192.168.165.174:5000/data");
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setRefreshing(false); // Set refreshing to false after fetching (success or error)
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Incident Reports</Text>
      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
          
            <Text style={styles.title}></Text>
            <Text>Incident Type: {item.incidentType}</Text>
            <Text>Severity: {item.severity}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Description: {item.incidentDescription}</Text>
            <Text>Time: {item.incidentTime}</Text>
            <Text>Contact: {item.contactInfo}</Text>
            <Text>Image: {item.image}</Text>


            {item.media && item.media.length > 0 && ( // Check if media exists
              <Image
                source={{ uri: `http://192.168.254.105:5000/data${item.media[0]}` }} // Corrected URI
                style={styles.image}
              />
            )}
          </View>
        )}
        refreshControl={ // Add RefreshControl
          <RefreshControl refreshing={refreshing} onRefresh={fetchIncidents} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default IncidentList;