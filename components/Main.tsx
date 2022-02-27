import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeTab from "../screens/bottomTab/HomeTab";
import Account from "../screens/bottomTab/Account";
import Create from "../screens/bottomTab/Create";
import Discover from "../screens/bottomTab/Discover";
import Icon from "react-native-vector-icons/Feather";
import colors from "../styles/colors";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const Main: React.FC = () => {
  const BottomTabs = createBottomTabNavigator();
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <NavigationContainer>
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
          name="Account"
          component={Account}
          initialParams={{ userId: userSlice.currentUser._id }}
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
    </NavigationContainer>
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
