import { StyleSheet, View } from "react-native";
import React from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import MessagesList from "../../components/chat/MessagesList";
import MessageForm from "../../components/chat/MessageForm";

const CurrentChat: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
}> = ({ navigation }) => {
  return (
    <View style={{ height: "100%" }}>
      <ChatHeader navigation={navigation} />
      <MessagesList />
      <MessageForm />
    </View>
  );
};

export default CurrentChat;

const styles = StyleSheet.create({});
