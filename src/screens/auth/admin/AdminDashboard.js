import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchVolunteersForAdmin, fetchReportsForAdmin } from "../../../firebase/firestore";

export default function AdminDashboard({ navigation }) {
  const [pendingVerifications, setPendingVerifications] = useState(1);
  const [pendingReports, setPendingReports] = useState(1);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const vols = await fetchVolunteersForAdmin();
    setPendingVerifications(vols.filter(v => !v.verified).length);

    const reps = await fetchReportsForAdmin();
    setPendingReports(reps.filter(r => r.status === "Pending Review").length);
  };

  const handleBroadcast = () => {
    Alert.prompt
      ? Alert.prompt("System Broadcast", "Enter announcement message to all active app users:", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Send Announcement",
            onPress: (text) => Alert.alert("Broadcast Sent! 📢", `Notification pushed: "${text || "Platform Maintenance Scheduled"}"`)
          }
        ])
      : Alert.alert("System Broadcast", "Broadcasting safety guidelines update to all users! 📢");
  };

  return (
    <View style={styles.container}>
      <Header
        title="Admin Console"
        subtitle="Platform Management & Security 🛡️"
        role="admin"
        onLogout={() => navigation.navigate("RoleSelection")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Metric Overview Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricVal}>148</Text>
            <Text style={styles.metricLabel}>Total Users</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={[styles.metricVal, { color: COLORS.volunteer.primary }]}>42</Text>
            <Text style={styles.metricLabel}>Verified Vols</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricVal, { color: COLORS.admin.primary }]}>{pendingVerifications}</Text>
            <Text style={styles.metricLabel}>Pending ID Check</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricVal, { color: COLORS.danger }]}>{pendingReports}</Text>
            <Text style={styles.metricLabel}>Flagged Reports</Text>
          </View>
        </View>

        {/* Priority Action Portals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Administration Controls</Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate("VolunteerVerification")}
          >
            <View style={styles.actionIconBadge}>
              <Text style={{ fontSize: 26 }}>📜</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Verify Volunteer IDs</Text>
              <Text style={styles.actionSub}>Review uploaded NIC/ID documents and issue verified badges</Text>
            </View>
            {pendingVerifications > 0 && (
              <View style={styles.badgeAlert}>
                <Text style={styles.badgeAlertText}>{pendingVerifications} New</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate("ReportsManagement")}
          >
            <View style={[styles.actionIconBadge, { backgroundColor: "#FEE2E2" }]}>
              <Text style={{ fontSize: 26 }}>⚠️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Reports & Complaints Moderation</Text>
              <Text style={styles.actionSub}>Investigate reported safety issues and account conduct</Text>
            </View>
            {pendingReports > 0 && (
              <View style={[styles.badgeAlert, { backgroundColor: COLORS.danger }]}>
                <Text style={styles.badgeAlertText}>{pendingReports} Review</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleBroadcast}
          >
            <View style={[styles.actionIconBadge, { backgroundColor: COLORS.caregiver.badgeBg }]}>
              <Text style={{ fontSize: 26 }}>📢</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Broadcast System Announcement</Text>
              <Text style={styles.actionSub}>Push platform updates or safety alerts to all users</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* System Activity Summary */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>📊 Activity & Compliance Summary</Text>
          <Text style={styles.summaryItem}>• System Security Audit: PASS (100% Data Encryption)</Text>
          <Text style={styles.summaryItem}>• Active Visits Monitored Today: 9 Visits</Text>
          <Text style={styles.summaryItem}>• Volunteer Average Rating: 4.88 / 5.00 ⭐</Text>
          
          <CustomButton
            title="📥 Download Platform Analytics PDF Report"
            variant="outline"
            onPress={() => Alert.alert("Analytics Exported", "Platform monthly usage report generated successfully!")}
            style={{ marginTop: 12 }}
          />
        </View>

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
    backgroundColor: COLORS.admin.bg
  },
  content: {
    padding: 16
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16
  },
  metricCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2
  },
  metricVal: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.admin.primary
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
    fontWeight: "600"
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2
  },
  actionIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.admin.badgeBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text
  },
  actionSub: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2
  },
  badgeAlert: {
    backgroundColor: COLORS.admin.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 6
  },
  badgeAlertText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "bold"
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10
  },
  summaryItem: {
    fontSize: 13,
    color: COLORS.subtext,
    marginBottom: 6
  }
});
