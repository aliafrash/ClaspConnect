import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { fetchVolunteersForAdmin, verifyVolunteerAccount } from "../../../firebase/firestore";

export default function VolunteerVerificationScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchVolunteersForAdmin();
    setVolunteers(data);
  };

  const handleAction = async (uid, name, approve) => {
    await verifyVolunteerAccount(uid, approve);
    Alert.alert(
      approve ? "Volunteer Verified! ✅" : "Verification Rejected ❌",
      `${name} has been ${approve ? "approved and granted verified status badge." : "rejected."}`
    );
    loadData();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.vIcon}>🙋‍♂️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.vName}>{item.displayName}</Text>
          <Text style={styles.vMeta}>Age {item.age || 24} • {item.occupation || "IT Professional"}</Text>
          <Text style={styles.vLocation}>📍 {item.location}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.verified ? styles.statusVerified : styles.statusPending
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.verified ? styles.textVerified : styles.textPending
            ]}
          >
            {item.verified ? "VERIFIED" : "PENDING CHECK"}
          </Text>
        </View>
      </View>

      <View style={styles.docBox}>
        <Text style={styles.docLabel}>Submitted Verification Document:</Text>
        <TouchableOpacity
          style={styles.docBtn}
          onPress={() => Alert.alert("Viewing Document", `Opening Document: ${item.idDocument || "NIC_Identity_2026.pdf"}`)}
        >
          <Text style={styles.docBtnText}>📄 {item.idDocument || "National_ID_Card.pdf"} (Tap to view)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bioText}>"{item.bio || "Eager to help elderly community members."}"</Text>

      {!item.verified ? (
        <View style={styles.actionRow}>
          <CustomButton
            title="Approve & Verify Badge"
            variant="success"
            onPress={() => handleAction(item.uid, item.displayName, true)}
            style={{ flex: 1, marginRight: 6 }}
          />
          <CustomButton
            title="Reject"
            variant="danger"
            onPress={() => handleAction(item.uid, item.displayName, false)}
            style={{ flex: 0.6 }}
          />
        </View>
      ) : (
        <View style={styles.verifiedBox}>
          <Text style={styles.verifiedText}>✅ Volunteer Status Active & Verified</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Volunteer Verification"
        subtitle="Review ID & background credentials"
        role="admin"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={volunteers}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 36 }}>📜</Text>
            <Text style={styles.emptyTitle}>No Volunteers Awaiting Review</Text>
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
    alignItems: "center",
    marginBottom: 10
  },
  vIcon: {
    fontSize: 36,
    marginRight: 12
  },
  vName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text
  },
  vMeta: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 2
  },
  vLocation: {
    fontSize: 12,
    color: COLORS.admin.primary,
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusPending: {
    backgroundColor: COLORS.admin.badgeBg
  },
  statusVerified: {
    backgroundColor: COLORS.volunteer.badgeBg
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold"
  },
  textPending: {
    color: COLORS.admin.primary
  },
  textVerified: {
    color: COLORS.volunteer.primary
  },
  docBox: {
    backgroundColor: COLORS.inputBg,
    padding: 10,
    borderRadius: 12,
    marginBottom: 10
  },
  docLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.subtext,
    marginBottom: 4
  },
  docBtn: {
    paddingVertical: 4
  },
  docBtnText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.caregiver.primary
  },
  bioText: {
    fontSize: 13,
    color: COLORS.text,
    fontStyle: "italic",
    marginBottom: 12
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verifiedBox: {
    backgroundColor: COLORS.volunteer.badgeBg,
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  verifiedText: {
    color: COLORS.volunteer.primary,
    fontWeight: "bold",
    fontSize: 13
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
