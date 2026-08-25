import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import UserCard from "../../../components/UserCard";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests } from "../../../firebase/firestore";

export default function ActivityMonitorScreen({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchRequests({ elderlyId: "demo-user-elderly" });
    setRequests(data);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>📍 {item.activityType}</Text>
        <Text
          style={[
            styles.badge,
            item.status === "Completed"
              ? styles.badgeSuccess
              : item.status === "In Progress"
              ? styles.badgeWarning
              : styles.badgeMatched
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.date}>📅 Scheduled: {item.date} at {item.time}</Text>
      <Text style={styles.notes}>Notes: {item.notes}</Text>

      {item.volunteerName ? (
        <View style={styles.volunteerBox}>
          <Text style={styles.vTitle}>Matched Volunteer Details:</Text>
          <UserCard
            user={{
              displayName: item.volunteerName,
              verified: true,
              rating: 4.9,
              points: 140,
              location: "Kandy / Colombo"
            }}
            role="volunteer"
          />

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Alert.alert("Contact Volunteer", `Calling ${item.volunteerName}...`)}
            >
              <Text style={styles.btnText}>📞 Contact Volunteer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: COLORS.danger }]}
              onPress={() => Alert.alert("Report Issue", "Opening safety report portal for this visit.")}
            >
              <Text style={styles.btnText}>⚠️ Flag Concern</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.unmatchedBox}>
          <Text style={styles.unmatchedText}>⌛ Awaiting local volunteer match...</Text>
        </View>
      )}

      {item.rating && (
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>
            Elderly Feedback: ⭐ {item.rating}/5 Stars - "{item.feedback}"
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Live Activity Monitor"
        subtitle="Mr. Perera's Visit Stream"
        role="caregiver"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 36 }}>📊</Text>
            <Text style={styles.emptyTitle}>No Recorded Activities</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.caregiver.bg
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
    marginBottom: 6
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  badgeMatched: {
    backgroundColor: COLORS.caregiver.badgeBg,
    color: COLORS.caregiver.primary
  },
  badgeWarning: {
    backgroundColor: COLORS.admin.badgeBg,
    color: COLORS.admin.primary
  },
  badgeSuccess: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary
  },
  date: {
    fontSize: 13,
    color: COLORS.subtext,
    marginBottom: 4
  },
  notes: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 10
  },
  volunteerBox: {
    marginTop: 6
  },
  vTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.caregiver.primary,
    marginBottom: 2
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4
  },
  callBtn: {
    width: "48%",
    backgroundColor: COLORS.caregiver.primary,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center"
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12
  },
  unmatchedBox: {
    backgroundColor: COLORS.inputBg,
    padding: 10,
    borderRadius: 10,
    marginTop: 6
  },
  unmatchedText: {
    fontSize: 13,
    color: COLORS.subtext,
    fontStyle: "italic"
  },
  reviewBox: {
    backgroundColor: COLORS.volunteer.bg,
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  reviewText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.volunteer.primary
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50
  },
  emptyTitle: {
    fontSize: 16,
    color: COLORS.subtext,
    marginTop: 8
  }
});
