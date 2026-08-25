import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function UserCard({ user, role = "volunteer" }) {
  if (!user) return null;

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>
          {role === "volunteer" ? "🙋‍♀️" : role === "elderly" ? "👴" : "👥"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.displayName || user.name || "User"}</Text>
          {user.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        {user.age && <Text style={styles.subtext}>Age: {user.age} yrs</Text>}
        {user.location && <Text style={styles.subtext}>📍 {user.location}</Text>}
        
        {role === "volunteer" && (
          <View style={styles.statsRow}>
            <Text style={styles.statTag}>⭐ {user.rating || 4.9} Rating</Text>
            <Text style={styles.statTag}>🏆 {user.points || 140} Points</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  avatarEmoji: {
    fontSize: 26
  },
  infoContainer: {
    flex: 1
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.volunteer.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.success,
    marginLeft: 3
  },
  subtext: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 2
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 6
  },
  statTag: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    backgroundColor: COLORS.elderly.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8
  }
});
