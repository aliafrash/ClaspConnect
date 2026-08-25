import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests } from "../../../firebase/firestore";
import { mockSessionUser } from "../../../firebase/auth";

export default function ElderlyDashboard({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchRequests({ elderlyId: mockSessionUser.uid }).then((data) => {
      if (isMounted) setRequests(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeRequest = requests.find(r => r.status === "Matched" || r.status === "In Progress" || r.status === "Pending");

  return (
    <View style={styles.container}>
      <Header
        title="ClaspConnect"
        subtitle="Hello, Mr. Perera 👋"
        role="elderly"
        isElderly
        onLogout={() => navigation.navigate("RoleSelection")}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIconBadge}>
            <Text style={styles.welcomeIcon}>👴</Text>
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back, Mr. Perera</Text>
            <Text style={styles.welcomeDesc}>
              How can we help you stay connected and comfortable today?
            </Text>
          </View>
        </View>

        {/* High-Contrast Main Action Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.requestBigButton}
          onPress={() => navigation.navigate("RequestHelp")}
        >
          <View style={styles.requestIconBadge}>
            <Text style={styles.heartEmoji}>💖</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.requestBigTitle}>Request Help or Companionship</Text>
            <Text style={styles.requestBigSubtitle}>Tap here to select assistance type & time</Text>
          </View>
          <Ionicons name="chevron-forward" size={28} color={COLORS.white} />
        </TouchableOpacity>

        {/* Active Request Live Banner */}
        {activeRequest ? (
          <View style={styles.activeCard}>
            <View style={styles.activeHeader}>
              <Text style={styles.activeBadge}>
                {activeRequest.status === "Matched" ? "Matched with Volunteer" : activeRequest.status}
              </Text>
              <Text style={styles.activeDate}>{activeRequest.date} ({activeRequest.time})</Text>
            </View>

            <Text style={styles.activeType}>📍 {activeRequest.activityType}</Text>
            <Text style={styles.activeNotes} numberOfLines={2}>{activeRequest.notes}</Text>

            {activeRequest.volunteerName && (
              <View style={styles.matchedVolunteerBox}>
                <View style={styles.volunteerIconBadge}>
                  <Text style={styles.volunteerIcon}>🙋‍♀️</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.volunteerLabel}>Assigned Volunteer</Text>
                  <Text style={styles.volunteerName}>{activeRequest.volunteerName} (Verified)</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.callButton}
                  onPress={() => Alert.alert("Calling Volunteer", `Initiating call to ${activeRequest.volunteerName}...`)}
                >
                  <Ionicons name="call" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            )}

            <CustomButton
              title="View Request Details"
              variant="secondary"
              isElderly
              onPress={() => navigation.navigate("MyRequests")}
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>☕</Text>
            <Text style={styles.emptyTitle}>No Active Requests</Text>
            <Text style={styles.emptyDesc}>
              You have no pending visits right now. Tap above whenever you need help!
            </Text>
          </View>
        )}

        {/* Secondary Quick Action Cards */}
        <View style={styles.gridRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.gridCard}
            onPress={() => navigation.navigate("MyRequests")}
          >
            <Text style={styles.gridIcon}>📋</Text>
            <Text style={styles.gridTitle}>My Visit History</Text>
            <Text style={styles.gridSub}>View past & upcoming visits</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.gridCard, { backgroundColor: "#FEF2F2", borderColor: "#FCA5A5" }]}
            onPress={() => Alert.alert("Emergency Alert", "Connecting to emergency contact & family caregiver Thilini...")}
          >
            <Text style={styles.gridIcon}>🆘</Text>
            <Text style={[styles.gridTitle, { color: COLORS.danger }]}>Emergency Help</Text>
            <Text style={styles.gridSub}>Instant alert caregiver</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="🔄 Switch Persona / Test Other Roles"
          variant="outline"
          isElderly
          onPress={() => navigation.navigate("RoleSelection")}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.elderly.bg
  },
  content: {
    padding: 16
  },
  welcomeCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  welcomeIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  welcomeIcon: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  welcomeTextContainer: {
    flex: 1
  },
  welcomeTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    color: COLORS.elderly.primary,
    includeFontPadding: false
  },
  welcomeDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.subtext,
    marginTop: 2,
    includeFontPadding: false
  },
  requestBigButton: {
    flexDirection: "row",
    backgroundColor: COLORS.elderly.primary,
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4
  },
  requestIconBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14
  },
  heartEmoji: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  requestBigTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    color: COLORS.white,
    includeFontPadding: false
  },
  requestBigSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: "#E0D5FA",
    marginTop: 2,
    includeFontPadding: false
  },
  activeCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.elderly.primary,
    marginBottom: 16
  },
  activeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  activeBadge: {
    backgroundColor: COLORS.elderly.badgeBg,
    color: COLORS.elderly.primary,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 18,
    includeFontPadding: false
  },
  activeDate: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    fontWeight: "600",
    includeFontPadding: false
  },
  activeType: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 6,
    includeFontPadding: false
  },
  activeNotes: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.subtext,
    marginBottom: 12,
    includeFontPadding: false
  },
  matchedVolunteerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.volunteer.bg,
    padding: 12,
    borderRadius: 14,
    marginBottom: 8
  },
  volunteerIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  volunteerIcon: {
    fontSize: 26,
    lineHeight: 34,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  volunteerLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.volunteer.primary,
    fontWeight: "600",
    includeFontPadding: false
  },
  volunteerName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  callButton: {
    backgroundColor: COLORS.volunteer.primary,
    padding: 10,
    borderRadius: 20
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  emptyIcon: {
    fontSize: 40,
    lineHeight: 50,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 8,
    includeFontPadding: false
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.subtext,
    textAlign: "center",
    marginTop: 4,
    includeFontPadding: false
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  gridCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center"
  },
  gridIcon: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 6,
    includeFontPadding: false
  },
  gridTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    includeFontPadding: false
  },
  gridSub: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.subtext,
    textAlign: "center",
    marginTop: 2,
    includeFontPadding: false
  }
});

