import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests } from "../../../firebase/firestore";

export default function VolunteerDashboard({ navigation }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [acceptedTasks, setAcceptedTasks] = useState([]);

  const loadData = () => {
    fetchRequests().then((all) => {
      setOpportunities(all.filter(r => r.status === "Pending"));
      setAcceptedTasks(all.filter(r => r.volunteerId === "demo-user-volunteer" || r.status === "Matched" || r.status === "In Progress"));
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Volunteer Hub"
        subtitle="Hello, Nimali 🙋‍♀️"
        role="volunteer"
        onLogout={() => navigation.navigate("RoleSelection")}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Verification Status Banner */}
        <View style={styles.verificationBanner}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.verifyTitle}>Identity Verified Volunteer</Text>
            <Text style={styles.verifySub}>Background check complete & active</Text>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>🏆 140 Pts</Text>
          </View>
        </View>

        {/* Availability Toggle */}
        <View style={styles.availCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.availTitle}>Volunteering Status</Text>
            <Text style={styles.availSub}>
              {isAvailable ? "🟢 Ready to accept nearby requests" : "🔴 Temporarily busy"}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: "#D1D5DB", true: COLORS.volunteer.primary }}
          />
        </View>

        {/* Impact Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>14</Text>
            <Text style={styles.statLabel}>Visits Done</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>18h</Text>
            <Text style={styles.statLabel}>Time Given</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>4.9⭐</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Quick Action Navigation */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.actionCard}
            onPress={() => navigation.navigate("Opportunities")}
          >
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionTitle}>Browse Opportunities</Text>
            <Text style={styles.actionBadge}>{opportunities.length} Available</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.actionCard, { backgroundColor: COLORS.volunteer.badgeBg }]}
            onPress={() => navigation.navigate("AcceptedTasks")}
          >
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionTitle}>My Commitments</Text>
            <Text style={styles.actionBadge}>{acceptedTasks.length} Active</Text>
          </TouchableOpacity>
        </View>

        {/* Active Accepted Visit Live Tracker */}
        {acceptedTasks.length > 0 && (
          <View style={styles.activeVisitCard}>
            <View style={styles.activeHeader}>
              <Text style={styles.activeTag}>Upcoming Visit</Text>
              <Text style={styles.activeTime}>{acceptedTasks[0].date} @ {acceptedTasks[0].time}</Text>
            </View>

            <Text style={styles.elderName}>👴 {acceptedTasks[0].elderlyName} ({acceptedTasks[0].location})</Text>
            <Text style={styles.taskType}>📍 {acceptedTasks[0].activityType}</Text>
            <Text style={styles.taskNotes}>{acceptedTasks[0].notes}</Text>

            <CustomButton
              title="Manage Active Task (Check-in/Check-out)"
              variant="success"
              onPress={() => navigation.navigate("AcceptedTasks")}
              style={{ marginTop: 10 }}
            />
          </View>
        )}

        <CustomButton
          title="🔄 Switch Persona / Test Other Roles"
          variant="outline"
          onPress={() => navigation.navigate("RoleSelection")}
          style={{ marginTop: 14 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.volunteer.bg
  },
  content: {
    padding: 16
  },
  verificationBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.volunteer.primary,
    marginBottom: 14
  },
  verifyTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    includeFontPadding: false
  },
  verifySub: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.subtext,
    includeFontPadding: false
  },
  pointsBadge: {
    backgroundColor: COLORS.volunteer.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  pointsText: {
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    fontSize: 13,
    lineHeight: 18,
    includeFontPadding: false
  },
  availCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  availTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  availSub: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    marginTop: 2,
    includeFontPadding: false
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  statBox: {
    width: "31%",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border
  },
  statNum: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    includeFontPadding: false
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.subtext,
    marginTop: 2,
    includeFontPadding: false
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  actionCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center"
  },
  actionIcon: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 6,
    includeFontPadding: false
  },
  actionTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    includeFontPadding: false
  },
  actionBadge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    marginTop: 4,
    includeFontPadding: false
  },
  activeVisitCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.volunteer.primary,
    marginBottom: 14
  },
  activeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  activeTag: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    includeFontPadding: false
  },
  activeTime: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.subtext,
    fontWeight: "600",
    includeFontPadding: false
  },
  elderName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
    includeFontPadding: false
  },
  taskType: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.volunteer.primary,
    marginBottom: 4,
    includeFontPadding: false
  },
  taskNotes: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    marginBottom: 10,
    includeFontPadding: false
  }
});

