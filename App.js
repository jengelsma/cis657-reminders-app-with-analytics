import * as Analytics from "expo-firebase-analytics";

import React, { useRef } from "react";

import AddReminderScreen from "./screens/AddReminderScreen";
import { NavigationContainer } from "@react-navigation/native";
import RemindersScreen from "./screens/RemindersScreen";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={ async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
          console.log('Logging Screen: ', currentRouteName);
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen
          title="Add Reminder"
          name="AddReminder"
          component={AddReminderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
