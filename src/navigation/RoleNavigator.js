import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Elderly Screens
import ElderlyDashboard from "../screens/auth/elderly/ElderlyDashboard";
import RequestHelpScreen from "../screens/auth/elderly/RequestHelpScreen";
import MyRequestsScreen from "../screens/auth/elderly/MyRequestsScreen";
import FeedbackScreen from "../screens/auth/elderly/FeedbackScreen";

// Volunteer Screens
import VolunteerDashboard from "../screens/auth/volunteer/VolunteerDashboard";
import OpportunitiesScreen from "../screens/auth/volunteer/OpportunitiesScreen";
import AcceptedTasksScreen from "../screens/auth/volunteer/AcceptedTasksScreen";

// Caregiver Screens
import CaregiverDashboard from "../screens/auth/caregiver/CaregiverDashboard";
import LinkElderlyScreen from "../screens/auth/caregiver/LinkElderlyScreen";
import ActivityMonitorScreen from "../screens/auth/caregiver/ActivityMonitorScreen";

// Admin Screens
import AdminDashboard from "../screens/auth/admin/AdminDashboard";
import VolunteerVerificationScreen from "../screens/auth/admin/VolunteerVerificationScreen";
import ReportsManagementScreen from "../screens/auth/admin/ReportsManagementScreen";

const Stack = createNativeStackNavigator();

export default function RoleNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      {/* Elderly Persona Screens */}
      <Stack.Screen name="ElderlyTab" component={ElderlyDashboard} />
      <Stack.Screen name="RequestHelp" component={RequestHelpScreen} />
      <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />

      {/* Volunteer Persona Screens */}
      <Stack.Screen name="VolunteerTab" component={VolunteerDashboard} />
      <Stack.Screen name="Opportunities" component={OpportunitiesScreen} />
      <Stack.Screen name="AcceptedTasks" component={AcceptedTasksScreen} />

      {/* Caregiver Persona Screens */}
      <Stack.Screen name="CaregiverTab" component={CaregiverDashboard} />
      <Stack.Screen name="LinkElderly" component={LinkElderlyScreen} />
      <Stack.Screen name="ActivityMonitor" component={ActivityMonitorScreen} />

      {/* Admin Persona Screens */}
      <Stack.Screen name="AdminTab" component={AdminDashboard} />
      <Stack.Screen name="VolunteerVerification" component={VolunteerVerificationScreen} />
      <Stack.Screen name="ReportsManagement" component={ReportsManagementScreen} />
    </Stack.Navigator>
  );
}
