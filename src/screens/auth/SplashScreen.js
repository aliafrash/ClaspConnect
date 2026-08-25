import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("RoleSelection");
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>🤝</Text>
        </View>
        <Text style={styles.title}>ClaspConnect</Text>
        <Text style={styles.subtitle}>Connecting Generations with Care</Text>
        <Text style={styles.description}>
          Elderly Companionship & Micro-Volunteering Platform
        </Text>
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace("RoleSelection")}
      >
        <Text style={styles.skipText}>Get Started →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 30
  },
  content: {
    alignItems: "center",
    marginTop: 100
  },
  logoBadge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  logoIcon: {
    fontSize: 56
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 1
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.accent,
    fontWeight: "600",
    marginTop: 8
  },
  description: {
    fontSize: 14,
    color: "#E0D5FA",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20
  },
  skipButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  skipText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16
  }
});