import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchRequests } from "../../../firebase/firestore";

export default function CaregiverDashboard({ navigation }) {
  const [elderlyProfile, setElderlyProfile] = useState({
    name: "Mr. Perera (Father)",
    age: 72,
    location: "Colombo 03, Sri Lanka",
    linkCode: "PERERA-72"
  });

  const [recentVisits, setRecentVisits] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchRequests({ elderlyId: "demo-user-elderly" });
    setRecentVisits(data);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Caregiver Portal"
        subtitle="Hello, Thilini (Melbourne, Australia) 👩‍💼"
        role="caregiver"
        onLogout={() => navigation.navigate("RoleSelection")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Linked Elder Family Member Summary Card */}
        <View style={styles.linkedElderCard}>
          <View style={styles.linkedHeader}>
            <Text style={styles.avatar}>👴</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.elderName}>{elderlyProfile.name}</Text>
              <Text style={styles.elderSub}>📍 {elderlyProfile.location}</Text>
              <Text style={styles.codeTag}>Link Code: {elderlyProfile.linkCode}</Text>
            </View>
            <View style={styles.activeDot}>
              <Text style={{ fontSize: 10, color: COLORS.success, fontWeight: "bold" }}>● ACTIVE</Text>
            </View>
          </View>

          <View style={styles.elderBtnRow}>
            <TouchableOpacity
              style={styles.elderBtn}
              onPress={() => navigation.navigate("RequestHelp")}
            >
              <Text style={styles.elderBtnText}>➕ Request for Elder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.elderBtn, { backgroundColor: COLORS.caregiver.badgeBg }]}
              onPress={() => navigation.navigate("ActivityMonitor")}
            >
              <Text style={[styles.elderBtnText, { color: COLORS.caregiver.primary }]}>📊 Live Monitor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button: Link Additional Family Member */}
        <CustomButton
          title="🔗 Link Another Elderly Relative"
          variant="outline"
          onPress={() => navigation.navigate("LinkElderly")}
          style={{ marginBottom: 16 }}
        />

        {/* Real-time Activity Timeline Preview */}
        <View style={styles.timelineContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Real-time Activity Timeline</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ActivityMonitor")}>
              <Text style={styles.seeAll}>See Full Feed →</Text>
            </TouchableOpacity>
          </View>

          {recentVisits.map((visit) => (
            <View key={visit.id} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{visit.activityType}</Text>
                  <Text
                    style={[
                      styles.itemStatus,
                      visit.status === "Completed" ? styles.statusSuccess : styles.statusMatched
                    ]}
                  >
                    {visit.status}
                  </Text>
                </View>

                <Text style={styles.itemMeta}>📅 {visit.date} at {visit.time}</Text>

                {visit.volunteerName && (
                  <Text style={styles.itemVolunteer}>
                    Assigned Volunteer: <Text style={{ fontWeight: "bold" }}>{visit.volunteerName}</Text> (Verified)
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Safety & Report Issues Card */}
        <View style={styles.safetyCard}>
          <Text style={styles.safetyTitle}>🛡️ Safety & Incident Portal</Text>
          <Text style={styles.safetySub}>
            Notice an issue or want to report a volunteer? Our admin team investigates within 1 hour.
          </Text>
          <CustomButton
            title="Report Safety Issue / Complaint"
            variant="danger"
            onPress={() => {
              Alert.alert(
                "Report Submitted",
                "Your safety concern has been flagged directly to the System Administrator.",
                [{ text: "OK" }]
              );
            }}
            style={{ marginTop: 10 }}
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
    backgroundColor: COLORS.caregiver.bg
  },
  content: {
    padding: 16
  },
  linkedElderCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.caregiver.primary,
    marginBottom: 14,
    elevation: 2
  },
  linkedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  avatar: {
    fontSize: 40,
    marginRight: 12
  },
  elderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text
  },
  elderSub: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 2
  },
  codeTag: {
    fontSize: 12,
    color: COLORS.caregiver.primary,
    fontWeight: "bold",
    marginTop: 2
  },
  activeDot: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  elderBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4
  },
  elderBtn: {
    width: "48%",
    backgroundColor: COLORS.caregiver.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center"
  },
  elderBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 13
  },
  timelineContainer: {
    marginBottom: 16
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text
  },
  seeAll: {
    color: COLORS.caregiver.primary,
    fontWeight: "bold",
    fontSize: 13
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 12
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.caregiver.primary,
    marginTop: 6,
    marginRight: 10
  },
  timelineCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.text
  },
  itemStatus: {
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8
  },
  statusMatched: {
    backgroundColor: COLORS.caregiver.badgeBg,
    color: COLORS.caregiver.primary
  },
  statusSuccess: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.subtext,
    marginBottom: 4
  },
  itemVolunteer: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 2
  },
  safetyCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    marginBottom: 14
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.danger,
    marginBottom: 4
  },
  safetySub: {
    fontSize: 13,
    color: COLORS.subtext,
    lineHeight: 18
  }
});
