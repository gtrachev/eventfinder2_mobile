import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import HomeTab from "../screens/main/HomeTab";
import YourAccount from "../screens/main/YourAccount";
import Create from "../screens/main/Create";
import Discover from "../screens/main/Discover";

const Main: React.FC = () => {
  const BottomTabs = createBottomTabNavigator();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primaryColor,
          borderTopWidth: 0,
          alignItems: "center",
          height: 58,
        },
        tabBarLabel: "",
        tabBarInactiveTintColor: colors.whiteColor,
        tabBarActiveTintColor: colors.accentColor,
      }}
    >
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon
              color={tabInfo.color}
              name="home"
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon
              color={tabInfo.color}
              name="compass"
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon
              color={tabInfo.color}
              name="plus-square"
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="CurrentAccount"
        component={YourAccount}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon
              color={tabInfo.color}
              name="user"
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  bottomTabNavigator: {},
  bottomTabIcon: {
    fontSize: 30,
    marginTop: 10,
  },
});
