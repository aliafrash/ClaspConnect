import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { createAssistanceRequest } from "../../../firebase/firestore";

export default function RequestHelpScreen({ navigation }) {
  const [selectedActivity, setSelectedActivity] = useState("Grocery & Medication Help");
  const [date, setDate] = useState("2026-08-25");
  const [time, setTime] = useState("10:30 AM");
  const [location, setLocation] = useState("Colombo 03, Sri Lanka");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const activities = [
    { title: "Grocery & Medication Help", icon: "🛒", desc: "Help with buying food, pharmacy prescriptions." },
    { title: "Friendly Companionship", icon: "☕", desc: "Tea time chat, reading, sharing stories." },
    { title: "Tech & Phone Support", icon: "📱", desc: "Help with video calls, phone settings, TV." },
    { title: "Morning Walk & Exercise", icon: "🚶", desc: "Walking companion for safe neighborhood walks." },
    { title: "House & Light Help", icon: "🏡", desc: "Light household organization or garden help." }
  ];

  const handleSubmit = async () => {
    if (!selectedActivity || !location) {
      Alert.alert("Missing Info", "Please select an activity type and provide location details.");
      return;
    }

    setLoading(true);
    const res = await createAssistanceRequest({
      activityType: selectedActivity,
      date,
      time,
      location,
      notes: notes || "General companionship request."
    });
    setLoading(false);

    if (res.success) {
      Alert.alert(
        "Request Submitted! 🎉",
        "Your request for help has been posted. Local verified volunteers will be notified.",
        [
          {
            text: "Track My Request",
            onPress: () => navigation.navigate("MyRequests")
          }
        ]
      );
    } else {
      Alert.alert("Error", "Could not submit request. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Request Help"
        subtitle="Step 1 of 2: Select Activity"
        role="elderly"
        isElderly
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. What type of help do you need?</Text>
        
        {activities.map((act) => (
          <TouchableOpacity
            key={act.title}
            activeOpacity={0.75}
            style={[
              styles.activityCard,
              selectedActivity === act.title && styles.activityCardSelected
            ]}
            onPress={() => setSelectedActivity(act.title)}
          >
            <View style={styles.actIconBadge}>
              <Text style={styles.actIcon}>{act.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actTitle}>{act.title}</Text>
              <Text style={styles.actDesc}>{act.desc}</Text>
            </View>
            <Text style={styles.radio}>{selectedActivity === act.title ? "🔘" : "⚪"}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>2. Date, Time & Location</Text>
        
        <InputField
          label="Date"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          icon="calendar-outline"
          isElderly
        />

        <InputField
          label="Preferred Time"
          value={time}
          onChangeText={setTime}
          placeholder="e.g. 10:30 AM"
          icon="time-outline"
          isElderly
        />

        <InputField
          label="Location / Address"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter address or pickup point"
          icon="location-outline"
          isElderly
        />

        <InputField
          label="Additional Details / Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Need assistance walking up 3 steps."
          icon="create-outline"
          multiline
          numberOfLines={3}
          isElderly
        />

        <CustomButton
          title="Submit Request Now"
          variant="primary"
          isElderly
          loading={loading}
          onPress={handleSubmit}
          style={{ marginTop: 10, marginBottom: 30 }}
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
    padding: 18
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    color: COLORS.elderly.primary,
    marginTop: 10,
    marginBottom: 14,
    includeFontPadding: false
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 12
  },
  activityCardSelected: {
    borderColor: COLORS.elderly.primary,
    backgroundColor: COLORS.elderly.badgeBg
  },
  actIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  actIcon: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  actTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  actDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtext,
    marginTop: 2,
    includeFontPadding: false
  },
  radio: {
    fontSize: 20,
    lineHeight: 26,
    marginLeft: 8,
    textAlign: "center",
    includeFontPadding: false
  }
});

