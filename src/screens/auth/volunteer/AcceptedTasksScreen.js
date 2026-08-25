import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests, updateRequestStatus } from "../../../firebase/firestore";

export default function AcceptedTasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const loadData = () => {
    fetchRequests({ volunteerId: "demo-user-volunteer" }).then((data) => {
      setTasks(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async (taskId) => {
    await updateRequestStatus(taskId, "In Progress");
    Alert.alert("Visit Started! 🟢", "Check-in time recorded. Enjoy your companionship visit!");
    loadData();
  };

  const handleComplete = async (taskId) => {
    Alert.alert(
      "Complete Visit",
      "Confirm visit check-out? You will earn +20 Reward Points for this service!",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete Visit",
          onPress: async () => {
            await updateRequestStatus(taskId, "Completed");
            Alert.alert("Visit Completed! 🏆", "+20 Reward Points added to your profile!");
            loadData();
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.elderName}>👴 {item.elderlyName}</Text>
        <Text
          style={[
            styles.statusBadge,
            item.status === "In Progress"
              ? styles.bgInProgress
              : item.status === "Completed"
              ? styles.bgCompleted
              : styles.bgMatched
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.activity}>{item.activityType}</Text>
      <Text style={styles.details}>📍 {item.location} • 📅 {item.date} @ {item.time}</Text>

      <View style={styles.contactRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.contactBtn}
          onPress={() => Alert.alert("Call User", `Dialing ${item.elderlyName}...`)}
        >
          <Text style={styles.contactBtnText}>📞 Call Elder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.contactBtn, { backgroundColor: COLORS.caregiver.primary }]}
          onPress={() => Alert.alert("Caregiver Contact", "Calling caregiver Thilini (+94 77 000 1122)...")}
        >
          <Text style={styles.contactBtnText}>👩‍💼 Call Caregiver</Text>
        </TouchableOpacity>
      </View>

      {item.status === "Matched" && (
        <CustomButton
          title="🟢 Check-in / Start Visit"
          variant="primary"
          onPress={() => handleCheckIn(item.id)}
          style={{ marginTop: 10 }}
        />
      )}

      {item.status === "In Progress" && (
        <CustomButton
          title="🏁 Check-out & Mark Visit Completed (+20 Pts)"
          variant="success"
          onPress={() => handleComplete(item.id)}
          style={{ marginTop: 10 }}
        />
      )}

      {item.status === "Completed" && (
        <View style={styles.completedBanner}>
          <Text style={styles.completedText}>✅ Visit Completed! Earned +20 Points</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="My Commitments"
        subtitle="Manage active & past visits"
        role="volunteer"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No Commitments Yet</Text>
            <Text style={styles.emptySub}>Accept an opportunity from the browse screen to get started.</Text>
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
    marginBottom: 6
  },
  elderName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
    marginRight: 6,
    includeFontPadding: false
  },
  statusBadge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    includeFontPadding: false
  },
  bgMatched: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary
  },
  bgInProgress: {
    backgroundColor: COLORS.admin.badgeBg,
    color: COLORS.admin.primary
  },
  bgCompleted: {
    backgroundColor: COLORS.elderly.badgeBg,
    color: COLORS.elderly.primary
  },
  activity: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    marginBottom: 4,
    includeFontPadding: false
  },
  details: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    marginBottom: 12,
    includeFontPadding: false
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  contactBtn: {
    width: "48%",
    backgroundColor: COLORS.volunteer.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  contactBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false
  },
  completedBanner: {
    backgroundColor: COLORS.volunteer.badgeBg,
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: "center"
  },
  completedText: {
    color: COLORS.volunteer.primary,
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 18,
    includeFontPadding: false
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50
  },
  emptyEmoji: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    includeFontPadding: false
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 8,
    includeFontPadding: false
  },
  emptySub: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    marginTop: 4,
    textAlign: "center",
    includeFontPadding: false
  }
});

