import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Chats from "./Chats";
import CurrentChat from "./CurrentChat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChatsTab = () => {
  const Tabs = createNativeStackNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="UserChats"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="UserChats" component={Chats} />
      <Tabs.Screen name="CurrentChat" component={CurrentChat} />
    </Tabs.Navigator>
  );
};

export default ChatsTab;

const styles = StyleSheet.create({});
