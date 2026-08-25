import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests } from "../../../firebase/firestore";
import { mockSessionUser } from "../../../firebase/auth";

export default function MyRequestsScreen({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchRequests({ elderlyId: mockSessionUser.uid });
    setRequests(data);
  };

  const getFilteredRequests = () => {
    if (filter === "Active") {
      return requests.filter(r => r.status === "Pending" || r.status === "Matched" || r.status === "In Progress");
    }
    if (filter === "Completed") {
      return requests.filter(r => r.status === "Completed");
    }
    return requests;
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.activityName}>📍 {item.activityType}</Text>
        <Text
          style={[
            styles.statusTag,
            item.status === "Completed"
              ? styles.tagSuccess
              : item.status === "Matched"
              ? styles.tagMatched
              : styles.tagPending
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.dateText}>
        📅 {item.date} at {item.time} ({item.location})
      </Text>
      
      <Text style={styles.notesText}>{item.notes}</Text>

      {item.volunteerName && (
        <View style={styles.volunteerRow}>
          <Text style={styles.vIcon}>🙋‍♀️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.vLabel}>Volunteer Assigned</Text>
            <Text style={styles.vName}>{item.volunteerName}</Text>
          </View>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => Alert.alert("Call Volunteer", `Calling ${item.volunteerName}...`)}
          >
            <Text style={styles.actionBtnText}>📞 Call</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === "Completed" && (
        <View style={styles.completedBox}>
          {item.rating ? (
            <Text style={styles.ratingText}>Your Rating: ⭐ {item.rating}/5 - "{item.feedback}"</Text>
          ) : (
            <CustomButton
              title="⭐ Give Rating & Feedback"
              variant="success"
              isElderly
              onPress={() => navigation.navigate("Feedback", { requestId: item.id, volunteerName: item.volunteerName })}
            />
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="My Visit Requests"
        subtitle="Track status & ratings"
        role="elderly"
        isElderly
        onBack={() => navigation.goBack()}
      />

      <View style={styles.filterRow}>
        {["All", "Active", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterChip, filter === tab && styles.filterChipActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredRequests()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 36 }}>📋</Text>
            <Text style={styles.emptyText}>No requests found for this filter.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.elderly.bg
  },
  filterRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: COLORS.white
  },
  filterChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    marginHorizontal: 4
  },
  filterChipActive: {
    backgroundColor: COLORS.elderly.primary
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text
  },
  filterTextActive: {
    color: COLORS.white
  },
  listContent: {
    padding: 16
  },
  requestCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  activityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1
  },
  statusTag: {
    fontWeight: "bold",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  tagPending: {
    backgroundColor: COLORS.admin.badgeBg,
    color: COLORS.admin.primary
  },
  tagMatched: {
    backgroundColor: COLORS.elderly.badgeBg,
    color: COLORS.elderly.primary
  },
  tagSuccess: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary
  },
  dateText: {
    fontSize: 14,
    color: COLORS.subtext,
    marginBottom: 6
  },
  notesText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12
  },
  volunteerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.volunteer.bg,
    padding: 10,
    borderRadius: 12,
    marginTop: 4
  },
  vIcon: {
    fontSize: 24,
    marginRight: 8
  },
  vLabel: {
    fontSize: 11,
    color: COLORS.subtext
  },
  vName: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.text
  },
  actionBtn: {
    backgroundColor: COLORS.volunteer.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10
  },
  actionBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 13
  },
  completedBox: {
    marginTop: 10
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    backgroundColor: COLORS.volunteer.bg,
    padding: 10,
    borderRadius: 10
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.subtext,
    marginTop: 8
  }
});
