import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchReportsForAdmin, resolveReport } from "../../../firebase/firestore";

export default function ReportsManagementScreen({ navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchReportsForAdmin();
    setReports(data);
  };

  const handleResolve = async (id, action) => {
    await resolveReport(id, action);
    Alert.alert("Report Resolved", `Action taken: ${action}`);
    loadData();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.reporter}>⚠️ Flagged by: {item.reporterName}</Text>
        <Text
          style={[
            styles.badge,
            item.status === "Resolved" ? styles.badgeSuccess : styles.badgeDanger
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.subject}>Subject: {item.subjectType}</Text>
      <Text style={styles.desc}>"{item.description}"</Text>

      {item.status === "Pending Review" ? (
        <View style={styles.btnRow}>
          <CustomButton
            title="Issue Warning"
            variant="warning"
            onPress={() => handleResolve(item.id, "Issued Warning to Account")}
            style={{ flex: 1, marginRight: 6 }}
          />
          <CustomButton
            title="Block User"
            variant="danger"
            onPress={() => handleResolve(item.id, "Suspended User Account")}
            style={{ flex: 1 }}
          />
        </View>
      ) : (
        <View style={styles.resolvedBox}>
          <Text style={styles.resolvedText}>
            Resolved Action: {item.actionTaken || "Investigation Closed"}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Reports & Moderation"
        subtitle="Safety and incident complaints"
        role="admin"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 36 }}>🛡️</Text>
            <Text style={styles.emptyTitle}>No Pending Safety Reports</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.admin.bg
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
  reporter: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.danger
  },
  badge: {
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  badgeDanger: {
    backgroundColor: "#FEE2E2",
    color: COLORS.danger
  },
  badgeSuccess: {
    backgroundColor: COLORS.volunteer.badgeBg,
    color: COLORS.volunteer.primary
  },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4
  },
  desc: {
    fontSize: 13,
    color: COLORS.subtext,
    marginBottom: 12
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  resolvedBox: {
    backgroundColor: COLORS.admin.badgeBg,
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  resolvedText: {
    color: COLORS.admin.primary,
    fontWeight: "bold",
    fontSize: 12
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
