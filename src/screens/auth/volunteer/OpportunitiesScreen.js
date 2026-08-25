import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests, acceptOpportunity } from "../../../firebase/firestore";

export default function OpportunitiesScreen({ navigation }) {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    const data = await fetchRequests({ status: "Pending" });
    setOpportunities(data);
  };

  const handleAccept = async (item) => {
    Alert.alert(
      "Confirm Acceptance",
      `Are you sure you want to accept the request for ${item.elderlyName} on ${item.date} at ${item.time}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept Task",
          onPress: async () => {
            await acceptOpportunity(item.id, "demo-user-volunteer", "Nimali");
            Alert.alert("Task Accepted! 🎉", "This visit has been added to your commitments.");
            loadOpportunities();
            navigation.navigate("AcceptedTasks");
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.elderInfo}>
          <Text style={styles.avatar}>👴</Text>
          <View>
            <Text style={styles.elderName}>{item.elderlyName}</Text>
            <Text style={styles.elderAge}>Age {item.elderlyAge || 72} • 📍 {item.location}</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Open</Text>
        </View>
      </View>

      <Text style={styles.taskType}>📍 {item.activityType}</Text>
      <Text style={styles.dateTime}>📅 {item.date} at {item.time}</Text>
      
      <View style={styles.notesBox}>
        <Text style={styles.notesLabel}>Request Details:</Text>
        <Text style={styles.notesText}>{item.notes}</Text>
      </View>

      <CustomButton
        title="🤝 Accept Opportunity"
        variant="success"
        onPress={() => handleAccept(item)}
        style={{ marginTop: 10 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Nearby Opportunities"
        subtitle="Micro-volunteering requests"
        role="volunteer"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={opportunities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40 }}>🎉</Text>
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptySub}>
              There are no pending requests available at the moment.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.volunteer.bg
  },
  listContent: {
    padding: 16
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  elderInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    fontSize: 32,
    marginRight: 10
  },
  elderName: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.text
  },
  elderAge: {
    fontSize: 13,
    color: COLORS.subtext
  },
  badge: {
    backgroundColor: COLORS.volunteer.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  badgeText: {
    color: COLORS.volunteer.primary,
    fontWeight: "bold",
    fontSize: 12
  },
  taskType: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    marginBottom: 4
  },
  dateTime: {
    fontSize: 14,
    color: COLORS.subtext,
    marginBottom: 10
  },
  notesBox: {
    backgroundColor: COLORS.inputBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.subtext,
    marginBottom: 2
  },
  notesText: {
    fontSize: 14,
    color: COLORS.text
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 10
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 4,
    textAlign: "center"
  }
});
