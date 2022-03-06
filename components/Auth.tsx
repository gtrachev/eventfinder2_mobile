import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import UserTiers from "../screens/auth/UserTiers";
import AuthNav from "./AuthNav";

const Auth: React.FC = () => {
  const Tabs = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthNav />
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Tabs.Screen name="Login" component={Login} options={{}} />
        <Tabs.Screen name="Register" component={Register} options={{}} />
        <Tabs.Screen name="Tiers" component={UserTiers} options={{}} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Auth;

const styles = StyleSheet.create({});
