import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";

export default function AppNavigator() {

  return (
    <NavigationContainer>

      <AuthNavigator />

    </NavigationContainer>
  );
}