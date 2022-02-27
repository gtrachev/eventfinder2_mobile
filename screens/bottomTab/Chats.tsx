import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../../components/utils/AppText";
import colors from "../../styles/colors";
import ChatsSearch from "../../components/chat/ChatsSearch";
import ChatsList from "../../components/chat/ChatsList";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Chats: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
}> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: colors.whiteColor,
        height: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            style={{ fontSize: 30, color: colors.primaryColor }}
          />
        </TouchableOpacity>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 30,
          }}
        >
          Your chats
        </AppText>
      </View>
      <ChatsSearch />
      <ChatsList navigation={navigation} />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
